import { get_logo_endpoint, upload_logo_endpoint } from '../data/items.js'


export function validate_logo(file, error) {
    if (!file) return false
    if (!file.type.includes('png')) {
        error = 'Only PNG files are allowed.'
        return false
    }
    if (file.size > 5 * 1024 * 1024) {
        error = 'File size must be less than 5MB.'
        return false
    }
    return true
}

export async function upload_logo(file) {
  const res = await fetch(upload_logo_endpoint, {
    method: "POST",
    body: file,
    // Let the server know what it is (png/jpeg, etc.). Fallback is fine too.
    headers: {
      "Content-Type":  "application/octet-stream",
    },
    credentials: "include",
  });

  if (res.ok) return true;

  // Surface backend error payload when present
  try {
    const err = await res.json();
    throw new Error(err?.message || "Upload failed");
  } catch {
    throw new Error(await res.text());
  }
}



export async function get_logo() {
    try {
        const response = await fetch( get_logo_endpoint, {
            method: 'POST',
            credentials: "include"
        })

        if (!response.ok) {
            return null
        }

        const blob = await response.blob()
        if (blob.size === 0) return null

        return URL.createObjectURL(blob)
        
    } catch (err) {
        console.error("Error fetching logo:", err)
        return null
    }
}
