// Unified API configuration
// Per user request: using VITE_API_URL pattern
// Falls back to relative /api (handled by Next.js rewrites) for portability

export const API_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) 
    || (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_URL)
    || '/api';
