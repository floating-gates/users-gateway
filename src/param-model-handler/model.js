import { update_parametric_model_endopoint,
         get_complete_parametric_model_endpoint,
         get_parametric_models_vec_endpoint,
         delete_parametric_model_endopoint } from '../data/items.js';

export async function get_models() {

    const response = await fetch( get_parametric_models_vec_endpoint, {
        method: 'GET',
        credentials: 'include'
    });
    
    return response
}

export async function update_model( model ) {

    const response = await fetch( update_parametric_model_endopoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( model ),
        credentials: 'include'
    });
    
    return response
}


export async function get_complete_model( model_name ) {

    const response = await fetch( get_complete_parametric_model_endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: model_name,
        credentials: 'include'
    });
    
    return response
}



export async function delete_model( model_name ) {

    const response = await fetch( delete_parametric_model_endopoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: model_name,
        credentials: 'include'
    });
    
    return response
}
