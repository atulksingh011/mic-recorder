import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    sourcemap: 'inline',
    minify: false,
  },
  server: {
    sourcemap: "inline",
    minify: false,
  },
  plugins: [
    {
      name: 'rewrite-ort-files-path-middleware',
      configureServer(server) {
        // Add custom middleware
        server.middlewares.use((req, res, next) => {
          // Check if the request path matches the specified pattern
          const regex = /^\/node_modules\/\.vite\/deps\/ort-.*/;
          if (regex.test(req.url)) {
            // Get the current host and port from the request
            req.url = req.url
              .replace('/node_modules/.vite/deps', '/assets') // Rewrite to /assets
              .replace(/\?.*/, ''); // Remove query parameters
          }

          next();
        });
      }
    }
  ]
});
