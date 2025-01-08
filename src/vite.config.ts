import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@pages": path.resolve(__dirname, "./src/pages"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('@radix-ui') || id.includes('class-variance-authority')) {
              return 'ui-vendor';
            }
            if (id.includes('recharts') || id.includes('d3')) {
              return 'chart-vendor';
            }
            return 'vendor';
          }
          if (id.includes('/pages/')) {
            return 'pages';
          }
        }
      }
    },
    chunkSizeWarningLimit: 500
  }
});