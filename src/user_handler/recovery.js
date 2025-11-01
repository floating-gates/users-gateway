import { user_recovery_api_endpoint,
    set_new_usr_passwd_endpoint } from "../config.js"

export async function start_recovery_password( email ) {

    const response = await fetch( user_recovery_api_endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: email,
        credentials: 'include',
    });

    return response;
}


export async function set_new_passwd( password, user_id ) {

    const response = await fetch( set_new_usr_passwd_endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, user_id }),
        credentials: 'include',
    });
    
    return response;
    
}


