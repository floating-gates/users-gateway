import { pricing_proj_api_endpoint } from "../data/items.js"

export async function set_price( proj ){
        const response = await fetch( pricing_proj_api_endpoint + "/" + proj.id, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ price: proj.price })
        });
        
        if (!response.ok) {
            const error = await response.json()
            console.error('Error setting price:', error.message)
            alert('Failed to set price.')
            return
        }
    return response
}
