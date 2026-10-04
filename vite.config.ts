import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { handleAnalyzeRequest } from './server/apiHandler.js';

// Custom Vite plugin to mount secure server API middleware
function apiServerPlugin() {
  return {
    name: 'blindspot-api-server',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api/analyze' && req.method === 'POST') {
          handleAnalyzeRequest(req, res);
        } else {
          next();
        }
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api/analyze' && req.method === 'POST') {
          handleAnalyzeRequest(req, res);
        } else {
          next();
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), apiServerPlugin()],
  server: {
    port: 3000,
    host: true
  },
  preview: {
    port: 3000,
    host: true
  }
});
