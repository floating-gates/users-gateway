import { get_autoquote_endpoint,
    update_autoquote_endpoint } from '../data/items.js'
import { toRaw } from 'vue'

export async function get_autoquote_config( ) {
    try {
        const res = await fetch( get_autoquote_endpoint, {
            method: 'GET',
            credentials: 'include'
        })

        if (!res.ok) {
            const err = await res.text()
            throw new Error(err)
        }

        return res.json()

    } catch (err) {
        console.error('Failed to get autoquote configuration:', err)
        return null
    }
}

function convert2multiplier(a) {
    a.overhead_multiplier = (a.overhead_multiplier + 100 )/ 100; 
    a.quantity_multipliers.forEach(m => m.value  = ( 100 - m.value ) / 100);
    a.tolerance_multipliers.forEach(m => m.value = ( m.value + 100 ) / 100);
    a.urgency_multipliers.forEach(m => m.value   = ( m.value + 100 ) / 100);
}


export async function update_autoquote_config(autoquote_config) {
  // Deep clone so we don't mutate the reactive object
  const cloned_config = structuredClone(toRaw(autoquote_config))

  convert2multiplier(cloned_config)

  try {
    const res = await fetch(update_autoquote_endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(cloned_config)
    })

    if (!res.ok) throw new Error(await res.text())
  } catch (err) {
    console.error('Failed to update autoquote config:', err)
  }
}
