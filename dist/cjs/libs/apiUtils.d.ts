/**
 * Setting/getting userId, JST Tokens, various axios api clients
 * Making lots of api hooks with swr
 *
 */
import { GenObj } from 'pk-ts-common-lib';
export declare function urlBase(url: string): string;
/**
 * React Hook to use Axios to fill data
 */
export declare function useAxiosBase(url: string, method: string, data?: GenObj): any;
export declare function useAxiosGet(url: string): any;
export declare function useAxiosPost(url: string, data?: GenObj): any;
//# sourceMappingURL=apiUtils.d.ts.map