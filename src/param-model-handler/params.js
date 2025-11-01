import {  get_parametric_params_vec_endpoint, update_parametric_params_endpoint, 
          delete_parametric_params_endpoint } from '../config.js';


export async function get_model_parameters( model_name ) {

    const response = await fetch( get_parametric_params_vec_endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: model_name,
        credentials: 'include'
    });
    
    return response
}


export async function delete_parameter( model_name, parameter_name  ) {

    const response = await fetch( delete_parametric_params_endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( {
            model: model_name,
            name: parameter_name
        } ),
        credentials: 'include'
    });
    
    return response
}


export async function update_params( params_vec ) {

    const response = await fetch( update_parametric_params_endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( params_vec ),
        credentials: 'include'
    });
    
    return response
}

