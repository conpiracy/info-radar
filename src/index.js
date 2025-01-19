const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/whop-data', (req, res) => {
  res.json({ message: 'whop-data endpoint' });
});

app.get('/api/update', (req, res) => {
  res.json({ message: 'update endpoint' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});