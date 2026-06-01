const envUrl = (import.meta.env.VITE_BASE_URL || "").trim();

// Dev: /api (Vite proxy). Production: full API host from .env.production
export const base_url =
  envUrl || (import.meta.env.DEV ? "/api" : "https://api.fitalal.com");

export const file_url = (import.meta.env.VITE_FILE_URL || "").trim();
