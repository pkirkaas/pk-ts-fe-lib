import { GenObj } from 'pk-ts-common-lib';
export declare function urlBase(url: string): string;
/**
 * React Hook to use Axios to fill data
 */
export declare function useAxiosBase(url: string, method: string, data?: GenObj): any;
export declare function useAxiosGet(url: string): any;
export declare function useAxiosPost(url: string, data?: GenObj): any;
/**
 * Like useAxios... above, but genaralized for any async function
 * @param anAsyncFnc - an asynchronous function call
 * @param args[] - arbitrary arbs to the function
 */
export declare function useAsync(anAsyncFnc: any, ...args: any[]): any;
//# sourceMappingURL=apiUtils.d.ts.map