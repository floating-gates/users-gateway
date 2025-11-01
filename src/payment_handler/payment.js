import { post_payment_information_endpoint } from "../config.js"

export async function post_payment_information(form, proj_id) {

    const response = await fetch(post_payment_information_endpoint +"/"+proj_id , {
        method: 'POST',
        body: form,
        credentials: 'include',

    })
    
    return response
}
