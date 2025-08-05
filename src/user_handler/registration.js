import { register_user_api_endpoint } from "../data/items.js"

export async function register_user(registration_form) {

    const response = await fetch(register_user_api_endpoint, {
            method: 'POST',
            body: registration_form,
        })
        
    return response
}
