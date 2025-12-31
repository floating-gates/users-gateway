import { auth_google_api_endpoint } from '../config.js'

export function handleGoogleAuthentication() {
  window.location.href = auth_google_api_endpoint
}
