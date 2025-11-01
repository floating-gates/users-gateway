import { create_subscription_endpoint,
         delete_subscription_endpoint } from '../config.js'


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


/*
Only possible feature_list:
['payment_independent', 'manufacturing_checks', 'top_opt', 'parametric_design']
*/
export function derive_menu_from_features( feature_dict ) {
    const menu = [
        'Summary',
        'Machines',
        'Materials',
        'Features',
        'Admin',
        'Brand' ];

    if (feature_dict["automatic_quotation"])  menu.push('AutoQuote')
    if (feature_dict["parametric_design"])    menu.push('Devices')
    // if (feature_dict["payment_independent"])  menu.push('Payment')
    return menu
}
