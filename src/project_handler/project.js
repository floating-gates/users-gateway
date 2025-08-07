import { get_project_endpoint,
         create_project_endpoint,
         delete_project_endpoint,
         download_api_endpoint
       } from '../data/items.js'

export async function create_project( proj_name,
                                      customer_mail,
                                      description,
                                      shipping_address ) {

    const response = await fetch( create_project_endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { proj_name, customer_mail, description, shipping_address } ),
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



export async function downloadFile( proj_id ) {
    try {
        const response = await fetch( download_api_endpoint + "/" + proj_id , {
            method: 'GET',
            credentials: 'include'
        });
        
        if (!response.ok) {
            throw new Error('Failed to download file');
        }
        
        const blob = await response.blob();
        
        // TODO generalize
        let filename = proj_id + ".stl";
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename; 
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    } catch (err) {
        alert("Could not download the file.");
    }
}
