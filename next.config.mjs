// The browser calls /api/test on this site; Next forwards it to FastAPI.
// This avoids CORS and keeps the backend URL out of client code.
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [{ source: "/api/test", destination: `${BACKEND_URL}/api/test` }];
  },
};
export default nextConfig;
