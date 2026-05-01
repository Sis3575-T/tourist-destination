/**
 * API base URL.
 * Uses VITE_API_URL env var if set, otherwise falls back to the production backend URL.
 * In development, Vite proxies /api → http://127.0.0.1:6005 (see vite.config.js).
 */
export const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : 'https://tourist-destination-5zp2.onrender.com/api'
