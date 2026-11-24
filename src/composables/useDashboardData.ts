import { onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'

export function useDashboardData<T>(file: string) {
  const data = shallowRef<T | null>(null)
  const error = ref(false)
  const loading = ref(true)
  let controller: AbortController | undefined

  async function reload() {
    controller?.abort()
    controller = new AbortController()
    const request = controller
    loading.value = true
    error.value = false
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}data/${file}`, { signal: request.signal, cache: 'no-store' })
      if (!response.ok) throw new Error(`Dashboard data request returned ${response.status}`)
      const json: unknown = await response.json()
      if (!json || typeof json !== 'object' || Array.isArray(json)) throw new Error('Expected a dashboard data object')
      if (!request.signal.aborted) data.value = json as T
    } catch {
      if (!request.signal.aborted) error.value = true
    } finally {
      if (!request.signal.aborted) loading.value = false
    }
  }

  onMounted(reload)
  onBeforeUnmount(() => controller?.abort())
  return { data, error, loading, reload }
}
