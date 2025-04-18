import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Custom plugin to handle Brotli-compressed Unity files
    {
      name: 'unity-brotli-files',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Only handle .br files
          if (req.url && req.url.endsWith('.br')) {
            res.setHeader('Content-Encoding', 'br');
            
            // Set correct content type based on file extension
            if (req.url.includes('.js.br')) {
              res.setHeader('Content-Type', 'application/javascript');
            } else if (req.url.includes('.wasm.br')) {
              res.setHeader('Content-Type', 'application/wasm');
            } else if (req.url.includes('.data.br')) {
              res.setHeader('Content-Type', 'application/octet-stream');
            }
          }
          next();
        });
      }
    }
  ],
  server: {
    // Allow serving the .br files
    fs: {
      strict: false
    }
  }
});