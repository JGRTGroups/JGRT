import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the spa build directory
app.use(express.static(path.join(__dirname, '../spa')));

// API routes
app.get('/api/hello', (req, res) => {
  res.send('Hello from the server!');
});

// Serve the React app for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../spa/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Open your browser to http://localhost:${port} to see your app`);
});
