import { get_project_endpoint,
         create_project_endpoint,
         delete_project_endpoint
       } from '../data/items.js'

export async function create_project( proj_name, customer_mail, description ) {

    const response = await fetch( create_project_endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { proj_name, customer_mail, description } ),
        credentials: 'include',  })
        return response
}

export async function get_project() {

    const proj_list = await fetch( get_project_endpoint, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',  })

    return proj_list
}

export async function delete_project(project_id) {
    const response = await fetch(`${delete_project_endpoint}/${project_id}`, {
        method: 'DELETE',
        credentials: 'include',
    });
    return response;
}

export function count_project_states(projectVec, state) {
  return projectVec.filter(proj => proj.price_status === state).length;
}

