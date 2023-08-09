export const extractQueryParams = (query) => {
    return query.substr(1).split('&').reduce((queryParam, params) => {
        const [key, value] = params.split('=');
        queryParam[key] = value;
        return queryParam;
    }, {});
}