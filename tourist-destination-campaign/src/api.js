/**
 * API base URL — always points to the correct backend.
 * VITE_API_URL can override for custom deployments.
 */
export const API_BASE = (
  import.meta.env.VITE_API_URL ||
  'https://tourist-destination-5zp2.onrender.com'
).replace(/\/$/, '') + '/api'
