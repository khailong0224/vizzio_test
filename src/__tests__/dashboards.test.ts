import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createApp, nextTick, type App, type Component } from 'vue'
import { createMemoryHistory, createRouter, RouterView, type Router } from 'vue-router'
import PopulationView from '../views/PopulationView.vue'
import InvestmentView from '../views/InvestmentView.vue'
import StockTicker from '../components/investment/StockTicker.vue'
import commonSource from '../../public/data/common.json'
import populationSource from '../../public/data/population.json'
import investmentSource from '../../public/data/investment.json'

let app: App | undefined
let host: HTMLDivElement
let router: Router
let population: typeof populationSource
let investment: typeof investmentSource
let failure: 'http' | 'json' | null

function button(label: string) {
  const result = [...host.querySelectorAll('button')].find(el => el.textContent?.trim() === label || el.getAttribute('aria-label') === label)
  if (!result) throw new Error(`Missing button: ${label}`)
  return result
}

async function renderRoute(path: string) {
  router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/population', component: PopulationView }, { path: '/investment', component: InvestmentView }],
  })
  await router.push(path)
  app = createApp(RouterView)
  app.use(router).mount(host)
  await vi.waitFor(() => expect(host.querySelector('h1')?.textContent).toContain(failure ? 'could not be loaded' : path === '/population' ? population.title : investment.total.title))
  await nextTick()
}

function renderComponent(component: Component, props: Record<string, unknown>) {
  app = createApp(component, props)
  app.mount(host)
}

beforeEach(() => {
  host = document.createElement('div')
  document.body.append(host)
  population = structuredClone(populationSource)
  investment = structuredClone(investmentSource)
  failure = null
  vi.stubGlobal('fetch', vi.fn(async (input: RequestInfo | URL) => {
    const path = new URL(String(input), 'http://localhost').pathname
    if (failure === 'http' && path.endsWith('population.json')) return new Response('', { status: 503 })
    if (failure === 'json' && path.endsWith('population.json')) return new Response('{ invalid json')
    const data = path.endsWith('common.json') ? commonSource : path.endsWith('population.json') ? population : investment
    return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } })
  }))
})

afterEach(() => {
  app?.unmount()
  app = undefined
  host.remove()
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('runtime JSON → dashboard rendering', () => {
  it('renders changed population values, chart proportions, regional scale, and negative growth', async () => {
    population.ageGroups[0]!.value = 7.3
    population.ageGroups[0]!.growth = -2.2
    population.demographics.segments[0]!.value = 60
    population.demographics.segments[1]!.value = 40
    population.regions.axis = { min: 0, max: 100, step: 20 }
    population.regions.items[0]!.value = 40
    await renderRoute('/population')
    await vi.waitFor(() => expect(host.querySelector('.donut')).not.toBeNull())

    expect(host.querySelector('.age-stat [aria-label="7.3"]')).not.toBeNull()
    expect(host.querySelector('.age-stat .change-negative')?.textContent).toContain('-2.2%')
    expect(host.querySelector('.donut')?.getAttribute('aria-label')).toBe('Male: 60%; Female: 40%')
    expect(host.querySelector('.donut-arc')?.getAttribute('stroke-dasharray')).toBe('60 40')
    expect((host.querySelector('.region-bar') as HTMLElement).style.height).toBe('40%')
    expect(host.querySelector('table')?.textContent).toContain('Riyadh40%')
    expect(fetch).toHaveBeenCalledWith('/data/population.json', expect.objectContaining({ cache: 'no-store' }))
  })

  it('navigates to investment and renders changed totals, sectors, economies, and ticker quotes', async () => {
    investment.total.value = 143
    investment.sectors.items[0]!.value = 42
    investment.sectors.items[1]!.value = 21
    investment.sectors.items[2]!.value = 17
    investment.sectors.items[3]!.value = 20
    investment.economies.items[0]!.value = 48.9
    investment.ticker.items[0]!.price = 35.67
    await renderRoute('/population')
    await vi.waitFor(() => expect(host.querySelector('nav')).not.toBeNull())
    ;(host.querySelector('a[href="/investment"]') as HTMLAnchorElement).click()
    await vi.waitFor(() => expect(host.querySelector('#fdi-title')).not.toBeNull())

    expect(router.currentRoute.value.path).toBe('/investment')
    expect(host.querySelector('.fdi-total [aria-label="143"]')).not.toBeNull()
    expect(host.querySelector('.sector-value [aria-label="42"]')).not.toBeNull()
    expect((host.querySelector('.sector-bar > span') as HTMLElement).style.width).toBe('42%')
    expect(host.querySelector('.economies-list [aria-label="48.9"]')).not.toBeNull()
    expect(host.querySelector('.ticker-group')?.textContent).toContain('35.67 SAR')
    expect(host.querySelector('[aria-label="Annual change: -21.0%"]')).not.toBeNull()
    expect(host.querySelectorAll('.economies-list li')).toHaveLength(5)
  })

  it.each(['http', 'json'] as const)('recovers from a %s data failure through the retry button', async (mode) => {
    failure = mode
    await renderRoute('/population')
    expect(host.querySelector('[role="alert"]')).not.toBeNull()
    failure = null
    button('Try again').click()
    await vi.waitFor(() => expect(host.querySelector('#demographic-title')).not.toBeNull())
    expect(host.querySelector('[role="alert"]')).toBeNull()
  })

  it('keeps the current route when the keyboard skip link focuses dashboard content', async () => {
    await renderRoute('/investment')
    await vi.waitFor(() => expect(host.querySelector('.skip-link')).not.toBeNull())
    ;(host.querySelector('.skip-link') as HTMLAnchorElement).click()
    await nextTick()
    expect(document.activeElement?.id).toBe('dashboard-content')
    expect(router.currentRoute.value.path).toBe('/investment')
  })
})

describe('stock ticker controls', () => {
  it('allows manual pause and resume, and hides the duplicate quotes from assistive technology', async () => {
    renderComponent(StockTicker, { data: investment.ticker })
    button(investment.ticker.pauseLabel).click()
    await nextTick()
    expect(host.querySelector('.ticker-paused')).not.toBeNull()
    expect(button(investment.ticker.resumeLabel).getAttribute('aria-pressed')).toBe('true')
    button(investment.ticker.resumeLabel).click()
    await nextTick()
    expect(host.querySelector('.ticker-paused')).toBeNull()
    expect(host.querySelector('.ticker-duplicate')?.getAttribute('aria-hidden')).toBe('true')
  })

  it('disables motion for reduced-motion users and removes its media listener on unmount', async () => {
    const removeEventListener = vi.fn()
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: true, addEventListener: vi.fn(), removeEventListener } as unknown as MediaQueryList)
    renderComponent(StockTicker, { data: investment.ticker })
    await nextTick()
    expect(host.querySelector('.ticker-reduced-motion')).not.toBeNull()
    expect(button(investment.ticker.reducedMotionLabel).disabled).toBe(true)
    app?.unmount()
    app = undefined
    expect(removeEventListener).toHaveBeenCalledWith('change', expect.any(Function))
  })
})
