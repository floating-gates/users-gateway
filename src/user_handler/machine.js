import { update_machine_endpoint, get_machine_endpoint } from '../data/items.js'

export async function  getMachineList() {
    try {
        const res = await fetch( get_machine_endpoint, {
            method: 'GET',
            credentials: 'include',
        })

        if (!res.ok) {
            const err = await res.text()
            throw new Error(err)
        }

        return res.json()

    } catch (err) {
        console.error('Failed to update feature:', err)
    }
}
    

export async function updateMachineList( machine_list ){
    try {
        const res = await fetch( update_machine_endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( machine_list ),
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


