// Centralized API configuration
// You can override the base URL via an env var in app.config or .env using EXPO_PUBLIC_API_URL
// e.g., EXPO_PUBLIC_API_URL=https://api.example.com

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3333';
