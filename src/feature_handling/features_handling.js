import { update_feature_endpoint } from "../config.js"

export async function update_features(
    independent_payment,
    automatic_quotation,
    parametric_design ) {
    
    const features = {
        independent_payment,
        automatic_quotation,
        parametric_design
    }; 

    try {

        const res = await fetch( update_feature_endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( features ),
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
