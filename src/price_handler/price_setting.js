import { price_status, price_status_api_endpoint,
         pricing_proj_api_endpoint } from "../data/items.js"


export async function mark_proj_as_shipped( proj ) {


    const response = await fetch( price_status_api_endpoint + "/" + proj.id, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        credentials: 'include',
        body: price_status[7]
    }) 
    
    if (!response.ok) {
        const error = await response.json()
        console.error('Error setting price:', error.message)
        alert('Failed to set price.')
        return
    }
}


export async function handle_price_allocation( proj ) {
    try {
        const response = await set_price( proj, price_status[2] );
        
        if (response.ok) {
            proj.price_status = price_status[2];
        } else {
            const error = await response.json();
            throw new Error(error.message);
        }
    } catch (err) {
        alert('Failed to set price.');
    }
}

async function set_price( proj, price_status ){
    const response = await fetch( pricing_proj_api_endpoint + "/" + proj.id, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            price: proj.price,
            price_status })
    });
    
    if (!response.ok) {
        const error = await response.json()
        console.error('Error setting price:', error.message)
        alert('Failed to set price.')
        return
    }
    return response
}
