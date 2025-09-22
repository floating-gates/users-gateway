import { update_referral_api_endpoint } from '../data/items.js';


export async function update_referral_details( iban, swift ) {

    const response = await fetch( update_referral_api_endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( {
                iban,
                swift
        } ),
        credentials: 'include'
    });
    
    return response
}
