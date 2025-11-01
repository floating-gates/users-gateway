import { get_autoquote_endpoint,
    update_autoquote_endpoint } from '../config.js'
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

        const autoquote_config = await res.json()
        console.log(autoquote_config)
        convert2percentage( autoquote_config )
        return autoquote_config

    } catch (err) {
        console.error('Failed to get autoquote configuration:', err)
        return null
    }
}

// === Helper to convert percentage ↔ multiplier
function convert2multiplier(a) {
    a.overhead_multiplier = (a.overhead_multiplier + 100 )/ 100; 
    a.quantity_multipliers.forEach(m => m.value  = ( 100 - m.value ) / 100);
    a.tolerance_multipliers.forEach(m => m.value = ( m.value + 100 ) / 100);
    a.urgency_multipliers.forEach(m => m.value   = ( m.value + 100 ) / 100);
}


// === Helper to convert multiplier ↔ percentage
function convert2percentage(a) {
  a.overhead_multiplier = Number(((a.overhead_multiplier - 1) * 100).toFixed(3));
  a.quantity_multipliers.forEach(m => m.value = Number(((1 - m.value) * 100).toFixed(3)));
  a.tolerance_multipliers.forEach(m => m.value = Number(((m.value - 1) * 100).toFixed(3)));
  a.urgency_multipliers.forEach(m => m.value = Number(((m.value - 1) * 100).toFixed(3)));
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

      const updated_value = await res.json();
      console.log("update_value", updated_value)
    convert2percentage(updated_value);
    return updated_value
      
  } catch (err) {
    console.error('Failed to update autoquote config:', err)
  }
}
