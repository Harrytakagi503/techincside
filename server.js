import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Explicit MIME types mapping for critical assets
const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Middleware to serve static files with strictly enforced MIME types
app.use(express.static(__dirname, {
  setHeaders: (res, filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    if (mimeTypes[ext]) {
      res.setHeader('Content-Type', mimeTypes[ext]);
    }
    // Cache static assets for better performance
    res.setHeader('Cache-Control', 'public, max-age=3600');
  }
}));

// Route handling: serve index.html ONLY for navigation requests
// NEVER return index.html for static file requests (.css, .js, .jpg, etc.)
app.get('*', (req, res) => {
  const ext = path.extname(req.path).toLowerCase();
  
  // If request is asking for an asset that doesn't exist, return 404 instead of index.html
  // This prevents the browser "MIME type text/html is not supported stylesheet" error
  if (ext && ext !== '.html') {
    return res.status(404).type('text/plain').send(`Asset not found: ${req.path}`);
  }

  res.sendFile(path.join(__dirname, 'index.html'));
});

// Export app for serverless wrappers (Vercel / Cloud Functions)
export default app;

// Listen on port 3000 for local development & AI Studio container
app.listen(PORT, HOST, () => {
  console.log(`Techincside server running at http://${HOST}:${PORT}`);
});
