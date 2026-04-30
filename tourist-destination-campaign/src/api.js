/**
 * Same-origin `/api` works in dev (Vite proxy) and production (Express serves SPA + `/api`).
 * Override only if deploying frontend and backend on different origins.
 */
export const API_BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')
