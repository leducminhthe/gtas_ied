import { PrivateRouteType } from 'types/authType';

/**
 * Recursive func.
 * Flatten nested routes
 */
export function flattenRouteArr(routes: PrivateRouteType[], parentPath:string = '') {
  const arr:PrivateRouteType[] = [];

  routes.forEach((route) => {
    const combinePath = combinePaths(parentPath, route.path);
    arr.push({ ...route, path: combinePath });
    if (route.subRoutes) {
      const subArr = flattenRouteArr(route.subRoutes, combinePath);
      arr.push(...subArr);
    }
  });

  return arr;
}

/**
 * Recursive using generator.
 * Flatten nested routes.
 * To execute: [...flattenComponents(privateRoutes)]
 */
export function* flattenComponents(nestedComponents: PrivateRouteType[], pathPrefix: string = ''): IterableIterator<PrivateRouteType> {
  for (const { subRoutes, path, ...rest } of nestedComponents) {
    const newPath = combinePaths(pathPrefix, path);
    yield { ...rest, path: newPath };
    if (subRoutes) {
      yield* flattenComponents(subRoutes, newPath);
    }
  }
}

/**
 * Ensure no double trailing slash
 */
export const combinePaths = (parent: string, child: string) => `${parent.replace(/\/$/, '')}/${child.replace(/^\//, '')}`;
