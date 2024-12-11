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
import { GenObj, } from 'pk-ts-common-lib';
import { useState, useEffect } from 'react';

export function urlBase(url: string):string {
  if (!(url.charAt(0) === '/')) {
    url = `/${url}`;
  }
  return url;
}

/**
 * React Hook to use Axios to fill data
 */
export function useAxiosBase(url: string, method: string, data?: GenObj) {
  method = method.toLowerCase();
  if (!(['post', 'get'].includes(method))) {
    console.error(`Invalid method: [${method}]`);
    return false
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
          console.error(`Error in useAxiosBase:`,{url, method, error, errorJSON,});
          setError(error.toJSON());
          setLoading(false);
        }) ;
    }
  },[loading, apiData, error]);
  return apiData;
}

export function useAxiosGet(url: string) {
  return useAxiosBase(url, 'get');
}

export function useAxiosPost(url: string, data?: GenObj) {
  return useAxiosBase(url, 'post', data);
}
/**
 * Like useAxios... above, but genaralized for any async function
 * @param anAsyncFnc - an asynchronous function call
 * @param args[] - arbitrary arbs to the function
 */
export function useAsync(anAsyncFnc,...args) {
  let [apiData, setApiData] = useState(null);
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(true);
  useEffect( () => {
    async function runAsync() { 
    if (loading) {
      let res = await anAsyncFnc(...args);
      setApiData(res);
      setLoading(false);
    }
  }
  runAsync();
  }
  ,[loading, anAsyncFnc, ...args ]);
  return apiData;
}














