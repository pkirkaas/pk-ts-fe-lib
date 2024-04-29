/**
 * Setting/getting userId, JST Tokens, various axios api clients
 * Making lots of api hooks with swr
 *
 */
import useSWR from 'swr';
import axios from 'axios';
export function usersFetcher(arg) {
    console.log(`in usersFetcher, arg:`, { arg });
    return axios.get('/api/entities/users').then(res => res.data);
}
export function useGetUsers() {
    const { data, error, isLoading } = useSWR(`some random string`, usersFetcher);
    return {
        users: data,
        isLoading,
        isError: error
    };
}
export const axiosConfig = {};
//# sourceMappingURL=apiUtils.js.map