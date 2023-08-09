export const buildRoutePath = (path) => {

    const routeParamRegex = /:([a-zA-Z]+)/g;
    const pathWithParams = path.replaceAll(routeParamRegex, '(?<$1>[a-z0-9\-_]+)');

    return new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);
}