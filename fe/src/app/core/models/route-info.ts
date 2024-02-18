export interface RouteInfo {
  path: string;
  parameters?: string[];
}

export interface RouteWithId {
  id: number;
}

export interface RouteInfoWithId {
  id: number;
}

export function getRouteUrl(routeInfo: RouteInfo, base = ''): string {
  const params = routeInfo.parameters
    ? '/:' + Object.values(routeInfo.parameters).join('/:')
    : '';
  return base + routeInfo.path + params;
}
