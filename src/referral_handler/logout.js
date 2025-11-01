import { logout_referral_api_endpoint, COOKIE_NAME } from "../config.js";

export async function logout() {

    try {
        await fetch( logout_referral_api_endpoint, {
            method: 'POST',
            credentials: 'include',
        });
        localStorage.removeItem(COOKIE_NAME);
        
    } catch (error) {
        console.error("Logout failed: ", error);
        
    } 
}
