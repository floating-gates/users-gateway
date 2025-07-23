import { register_user_api_endpoint } from "../data/items.js"

export async function register_user(registrationForm) {

    const response = await fetch(register_user_api_endpoint, {
            method: 'POST',
            body: registrationForm,
        })
        
    return response
}
