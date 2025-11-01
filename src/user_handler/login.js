import { login_user_api_endpoint, auth_api_endpoint } from '../config.js';

export async function user_login( email, password ) {
    const response = await fetch( login_user_api_endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
    });
    return response;
}

async function get_user_credentials() {
    try {
        const response = await fetch( auth_api_endpoint, {
            method: 'POST',
            credentials: 'include',
        });
        return response;
    } catch (err) {
        console.error('Cookie verification failed', err);
        throw err;
    }
}


export async function verify_user_credentials() {
    try {
        const response = await get_user_credentials();
        if (!response.ok) {
            return { is_authenticated: false, is_admin: false };
        }

        const user = await response.json();
        console.log('User ID:', user.user_id, ' is admin ', user.is_admin);

        return {
            is_authenticated: true,
            is_admin: !!user.is_admin, // ensure it's boolean
        };

    } catch (err) {
        console.log('Credentials verification failed', err);
        return { authenticated: false, is_admin: false };
    }
}
