import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Serve static assets with automatic .html extension resolution
app.use(express.static(__dirname, { extensions: ['html'] }));

// Route de téléchargement direct de la bannière LinkedIn au format PNG
app.get('/download-banniere-linkedin', (req, res) => {
  const file = path.join(__dirname, 'assets', 'img', 'banniere_linkedin.png');
  res.download(file, 'banniere-linkedin-jessica-deplanche.png');
});

// Catch-all route to serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
