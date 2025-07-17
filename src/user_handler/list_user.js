import { list_users_api_endpoint } from '../data/items.js';

export async function get_users_list() {
    try {
        const response = await fetch( list_users_api_endpoint, {
            method: 'POST',
            credentials: 'include',
        });
        return response;
    } catch (err) {
        console.error('Cookie verification failed during list_users_api_endpoint()', err);
        throw err;
    }
}
