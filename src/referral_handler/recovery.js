import { referral_recovery_api_endpoint,
        set_new_referral_passwd_endpoint } from "../config.js"


export async function start_recovery_referral_passwd ( referral_email ) {

    const response = await fetch( referral_recovery_api_endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: referral_email,
        credentials: 'include',
    });

    return response;
}


export async function set_new_referral_passwd( password, referral_id ) {

    const response = await fetch( set_new_referral_passwd_endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, referral_id }),
        credentials: 'include',
    });
    
    return response;
    
}
