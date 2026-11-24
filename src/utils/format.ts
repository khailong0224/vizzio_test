export function number(value: number, decimals = 1) {
  return value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

export function signed(value: number, decimals = 1) {
  return `${value > 0 ? '+' : ''}${number(value, decimals)}`
}

export function assetUrl(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
