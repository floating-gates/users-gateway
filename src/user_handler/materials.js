import { update_materials_endpoint, get_materials_endpoint } from '../data/items.js'

export async function  getMaterials() {
    try {
        const res = await fetch( get_materials_endpoint, {
            method: 'GET',
            credentials: 'include',
        })

        if (!res.ok) {
            const err = await res.text()
            throw new Error(err)
        }

        return res.json()

    } catch (err) {
        console.error('Failed to fetch materials:', err)
    }
}
    

export async function updateMaterials( materials_list ){

    try {
        const res = await fetch( update_materials_endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( materials_list ),
            credentials: 'include',
        })
        
        if (!res.ok) {
            const err = await res.text()
            throw new Error(err)
        }
        
    } catch (err) {
        console.error('Failed to update feature:', err)
    }
}


