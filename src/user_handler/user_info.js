import { user_details_api_endpoint } from '../data/items.js';

export async function get_user_details() {
    const response = await fetch( user_details_api_endpoint, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });
    console.log(response);
    return response;
}

