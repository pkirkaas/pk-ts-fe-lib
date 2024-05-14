/**
 * Setting/getting userId, JST Tokens, various axios api clients
 * Making lots of api hooks with swr
 *
 */
import axios from 'axios';
axios.defaults.baseURL = "/api";
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
import { useState, useEffect } from 'react';
export function urlBase(url) {
    if (!(url.charAt(0) === '/')) {
        url = `/${url}`;
    }
    return url;
}
/**
 * React Hook to use Axios to fill data
 */
export function useAxiosBase(url, method, data) {
    method = method.toLowerCase();
    if (!(['post', 'get'].includes(method))) {
        console.error(`Invalid method: [${method}]`);
        return false;
    }
    url = urlBase(url);
    let [apiData, setApiData] = useState(null);
    useEffect(() => {
        if (!apiData) {
            axios[method](url, data)
                .then((res => {
                console.log(`In Then for refs`);
                setApiData(res.data);
            }));
        }
    });
    return apiData;
}
export function useAxiosGet(url) {
    return useAxiosBase(url, 'get');
}
export function useAxiosPost(url, data) {
    return useAxiosBase(url, 'post', data);
}
//# sourceMappingURL=apiUtils.js.map