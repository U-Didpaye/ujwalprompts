// Standalone Production Express Server for BlindSpot
// Serves static files from dist/ and mounts secure /api/analyze endpoint.

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleAnalyzeRequest } from './server/apiHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Mount API endpoint
app.post('/api/analyze', (req, res) => {
  handleAnalyzeRequest(req, res);
});

// Serve static assets from dist
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[BlindSpot] Production server running on http://localhost:${PORT}`);
  console.log(`[BlindSpot] GEMINI_API_KEY status: ${process.env.GEMINI_API_KEY ? 'Configured on Server' : 'Not Set (Using Deterministic AI Fallback)'}`);
});
