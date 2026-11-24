export interface BrandAsset { src: string; alt: string }
export interface DashboardMeta {
  id: string
  title: string
  background: string
  brands: BrandAsset
  header: { time: string; date: string; temperature: string }
}
export interface CommonData {
  appTitle: string
  skipLabel: string
  navigationLabel: string
  pages: { id: string; label: string; shortLabel: string; to: string }[]
  providers: BrandAsset
  compass: { label: string; ticks: string[] }
  controls: { weather: string; brightness: string; zoomIn: string; zoomOut: string; reset: string; fullscreen: string; exitFullscreen: string }
}
export interface Segment { label: string; value: number; color: string }
export interface AgeGroup {
  id: string; label: string; value: number; unit: string; decimals: number
  growth: number; growthLabel: string; icon: string
}
export interface PopulationData extends DashboardMeta {
  demographics: { title: string; centerLabel: string; unit: string; segments: Segment[] }
  ageGroups: AgeGroup[]
  regions: { title: string; unit: string; axis: { min: number; max: number; step: number }; items: { label: string; value: number }[] }
}
export interface InvestmentData extends DashboardMeta {
  total: { title: string; value: number; unit: string; decimals: number; caption: string; change: number; changeLabel: string }
  sectors: { title: string; unit: string; changeLabel: string; items: (Segment & { change: number })[] }
  economies: { title: string; unit: string; items: { code: string; label: string; value: number }[] }
  ticker: {
    label: string; pauseLabel: string; resumeLabel: string; reducedMotionLabel: string; durationSeconds: number; unit: string
    items: { name: string; price: number; priceDecimals: number; change: number }[]
  }
  weatherTitle: string
}
