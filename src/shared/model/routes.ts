export const ROUTES = {
  HOME: '/',
  SECOND: '/second',
  THIRD: '/third',
} as const

export function buildRoute(
  route: string,
  params?: Record<string, string>
): string {
  if (!params) return route
  return Object.entries(params).reduce(
    (path, [key, value]) => path.replace(`:${key}`, value),
    route
  )
}
