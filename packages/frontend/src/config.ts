export const BACKEND_URL = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3001'

export const API_URL = process.env.NEXT_PUBLIC_WS_URL == '/' ? '' : 'http://localhost:3001'