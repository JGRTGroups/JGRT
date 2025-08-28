import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/api/hello', (req, res) => {
  res.send('Hello from the server!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
