/**
 * API base URL built from VITE_API_URL environment variable.
 * Set VITE_API_URL=https://your-backend.com in your .env before deploying.
 * Example usage: fetch(`${API_BASE}/destinations`)
 */
export const API_BASE = `${import.meta.env.VITE_API_URL}/api`
