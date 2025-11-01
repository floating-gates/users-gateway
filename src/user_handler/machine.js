import { update_machine_endpoint, get_machine_endpoint } from '../config.js'

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
        console.error('Failed to fetch machines:', err)
    }
}
    

export async function updateMachineList( machine_list ){

    // const compliant_with_db_list = machine_list.map( m => delete m["specs"])
    // console.log(compliant_with_db_list)

    const compliant_with_db_list = machine_list.map(({ specs, selected, ...db_mach_record}) => db_mach_record)
    
    try {
        const res = await fetch( update_machine_endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( compliant_with_db_list ),
            credentials: 'include',
        })
        
        if (!res.ok) {
            const err = await res.json()
            throw new Error(err)
        }
        
    } catch (err) {
        console.error('Failed to update feature:', err)
    }
}


