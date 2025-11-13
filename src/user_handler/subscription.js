import { set_next_subscription_endpoint,
    get_gocardless_payment_link_endpoint,
    delete_subscription_endpoint } from '../config.js'


export async function get_gocardless_payment_link(recurring_monthly_price) {
  try {
    const response = await fetch( get_gocardless_payment_link_endpoint, {
      method: 'POST',
      body: JSON.stringify(recurring_monthly_price),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(`${err.message}`);
    }

    const payment_link = await response.text();
    return payment_link;
  } catch (err) {
    throw err;
  }
}


export async function set_next_subscription(
  subscription_plan,
  host_address,
  monthly_price
) {
  try {
    const response = await fetch( set_next_subscription_endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subscription_plan,
        monthly_price,
        host_address,
      }),
      credentials: 'include',
    });

    if (!response.ok) {
      const err = await response.json();

      // Specific handling for 409 conflict
      if (response.status === 409) {
        throw new Error(
          'The requested online-CAD address is already in use. Please choose a different one.'
        );
      }

      throw new Error(`${err.message}`);
    }

  } catch (err) {
    throw err;
  }
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
