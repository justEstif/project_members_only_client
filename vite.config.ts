import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        // target: `http://localhost:4200`,
        target: "https://members-only-85me.onrender.com",
        changeOrigin: true,
      },
    },
  },
});
