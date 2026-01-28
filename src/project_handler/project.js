import { get_project_endpoint,
         delete_project_endpoint,
         download_api_endpoint,
         price_status
       } from '../config.js'


export function connect_projects_via_ws( proj_list ) {
    const socket = new WebSocket( get_project_endpoint );

    socket.onopen = () => {
        console.log("Projects connected via WebSockets");
    };

    socket.onmessage = (event) => {
        const msg = JSON.parse(event.data);

        // Handle initial connection message
        if (msg.event === "connected" && Array.isArray(msg.data)) {
            proj_list.value = msg.data;
        }

        // Optionally handle future events
        if (msg.event === "project_added") {
            proj_list.value = msg.data;
        }
    };

    socket.onclose = () => {
        console.log("WebSocket closed, retrying in 3s...");
        setTimeout(() => connect_projects_via_ws(proj_list), 3000);
    };

    socket.onerror = (err) => {
        console.error("WebSocket error:", err);
        socket.close();
    };
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
            throw new Error(
                `Input file download failed with status: ${response.status}`);
        }
            // Get the Content-Type header and normalize it
        const contentType = (response.headers.get("Content-Type") || "").toLowerCase();
    
        let extension = "";
        if (contentType.includes("stl")) {
            extension = "stl";
        } else if (contentType.includes("step")) {
            extension = "step";
        } else {
            // Optional: Logic to fallback to a default or check file signature
            console.warn("Unknown Content-Type received:", contentType);
        }
        
        const blob = await response.blob();

        let filename = proj_id + "." + extension;
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


export function get_progress( proj ) {    
    if      ( proj.price_status === price_status[1] ) { return 10 } 
    else if ( proj.price_status === price_status[2] ) { return 30 }
    else if ( proj.price_status === price_status[3] ) { return 50 }
    else if ( proj.price_status === price_status[4] ) { return 100 }
    else if ( proj.price_status === price_status[5] ) { return 80 }
    else if ( proj.price_status === price_status[6] ) { return 90 }
    else if ( proj.price_status === price_status[7] ) { return 100 }    
    
}
