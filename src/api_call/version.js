import { webserver_version_compat_endpoint  } from '../config.js'

export async function check_version() {
  try {
    const response = await fetch( webserver_version_compat_endpoint );
    const version = await response.text();
      
      if ( version >= __REQUIRED_SERVER_VERSION__ ) {
        console.error(`Version Mismatch: Server is ${version},
        UI needs ${__REQUIRED_SERVER_VERSION__}`);
    }

    console.log("Connected to server: ", __REQUIRED_SERVER_VERSION__)
      
  } catch (err) {
    console.error("Could not reach the webserver");
  }
}
