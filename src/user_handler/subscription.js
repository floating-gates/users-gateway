import { create_subscription_endpoint,
         delete_subscription_endpoint } from '../data/items.js'


export async function create_subscription(
    subscription_plan,
    host_address,
    monthly_price ) {

    const response = await fetch( create_subscription_endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( {
            subscription_plan,
            monthly_price,
            host_address
        } ),
        credentials: 'include', })
        return response
}

export async function delete_subscription() {
    const response = await fetch(`${delete_subscription_endpoint}`, {
        method: 'DELETE',
        credentials: 'include',
    });
    return response;
}
