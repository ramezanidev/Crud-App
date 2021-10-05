const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('Hello'));
app.get('/a', (req, res) => res.send('a'));


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));
