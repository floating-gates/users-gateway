import { update_feature_endpoint } from "../data/items.js"


export async function updateFeature( independent_payment, automatic_quotation ) {
  try {
    const res = await fetch( update_feature_endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        independent_payment,
        automatic_quotation
      }),
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
