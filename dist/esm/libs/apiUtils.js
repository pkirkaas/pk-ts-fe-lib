"use client";
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
    let [error, setError] = useState(null);
    let [loading, setLoading] = useState(true);
    useEffect(() => {
        if (loading) {
            axios[method](url, data)
                .then((res => {
                console.log(`In Then for refs`);
                setApiData(res.data);
                setLoading(false);
            }))
                .catch((error) => {
                let errorJSON = error.toJSON();
                console.error(`Error in useAxiosBase:`, { url, method, error, errorJSON, });
                setError(error.toJSON());
                setLoading(false);
            });
        }
    }, [loading, apiData, error]);
    //}); //Orig w/o dependencies
    return apiData;
}
export function useAxiosGet(url) {
    return useAxiosBase(url, 'get');
}
export function useAxiosPost(url, data) {
    return useAxiosBase(url, 'post', data);
}
//Untested - based on suggestion from Claude, but improved...
// General use of async functions in Components....
// TOTALLY UNSURE OF THIS!!
//Look into react useCallback...
/*
import { useState, useEffect, useCallback } from 'react';

const useFetchData = (asyncFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const result = await asyncFunction(...args);
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [asyncFunction, ...dependencies]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, fetchData };
};

*/
/**
 * Like useAxios... above, but genaralized for any async function
 * @param anAsyncFnc - an asynchronous function call
 * @param args[] - arbitrary arbs to the function
 */
export function useAsync(anAsyncFnc, ...args) {
    let [apiData, setApiData] = useState(null);
    let [error, setError] = useState(null);
    let [loading, setLoading] = useState(true);
    useEffect(() => {
        async function runAsync() {
            if (loading) {
                let res = await anAsyncFnc(...args);
                setApiData(res);
                setLoading(false);
            }
        }
        runAsync();
    }, [loading, anAsyncFnc, ...args]);
    return apiData;
}
//# sourceMappingURL=apiUtils.js.map