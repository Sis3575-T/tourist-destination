/**
 * In production: backend serves the frontend, so /api works same-origin.
 * In development: Vite proxies /api → http://127.0.0.1:6005 (see vite.config.js).
 * VITE_API_URL can override this for deployments where frontend/backend are on different hosts.
 */
export const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api'
