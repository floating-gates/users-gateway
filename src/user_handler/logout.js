import { logout_api_endpoint, COOKIE_NAME } from "../config.js";

export async function logout() {

    try {
        await fetch( logout_api_endpoint, {
            method: 'POST',
            credentials: 'include',
        });
        localStorage.removeItem(COOKIE_NAME);
        window.location.replace("/login");
    } catch (error) {
        console.error("Logout failed: ", error);
    }
} 
