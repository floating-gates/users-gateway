import { referral_details_api_endpoint } from '../config.js';

export async function get_referral_details() {
    const response = await fetch( referral_details_api_endpoint, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });
    
    return await response.json(); 
}
