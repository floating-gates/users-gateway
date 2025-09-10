import { login_referral_api_endpoint,
         referral_auth_api_endpoint } from '../data/items.js';

export async function referral_login( email, password ) {
    const response = await fetch( login_referral_api_endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
    });
    return response;
}


async function get_referral_credentials() {
    try {
        const response = await fetch( referral_auth_api_endpoint, {
            method: 'POST',
            credentials: 'include',
        });

        return response;
    } catch (err) {
        console.error('Cookie verification failed', err);
        throw err;
    }
}


export async function verify_referral_credentials() {
    try {
        const response = await get_referral_credentials();

        if (!response.ok) {
            return { is_authenticated: false, is_admin: false };
        }

        const user = await response.json();
        console.log('User ID:', user.user_id, ' is admin ', user.is_admin);

        return {
            is_authenticated: true,
            is_admin: false
        };

    } catch (err) {
        console.log('Credentials verification failed', err);
        return { authenticated: false, is_admin: false };
    }
}
