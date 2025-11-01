import { register_referral_api_endpoint } from "../config.js"

export async function register_referral(registration_form) {

    const response = await fetch(register_referral_api_endpoint, {
            method: 'POST',
            body: registration_form,
        })
        
    return response
}
