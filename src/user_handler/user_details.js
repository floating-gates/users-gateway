import { user_details_api_endpoint } from '../data/items.js';

/*
UserDetails = {
    full_name: string,            // Full name of the user
    host_address: string,         // User's registered or access host address
    email: string,                // User's email address
    subscription_status: string,  // 'active', 'inactive', 'instantiation', 'demo'
    subscription_plan: string,    // 'basic', 'standard', 'enterprise', 'demo'
    automatic_quotation: number,  // 0 or 1
    payment_independent: number,  // 0 or 1
    parametric_design: number,    // 0 or 1
    provisional_hub_name?: string,// Optional provisional hub name
    discount: number              // Discount value or percentage
}
*/
export async function get_user_details() {
    const response = await fetch( user_details_api_endpoint, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });
    
    return await response.json(); 
}
