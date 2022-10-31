import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        // target: "https://members-only-85me.onrender.com/",
        target: "https://project-members-only-production.up.railway.app/",
        changeOrigin: true,
      },
    },
  },
});
