import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { config } from "dotenv";

config();

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    "process.env": process.env,
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  },
  optimizeDeps: {
    exclude: ["react-hot-toast"],
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
