const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => res.send('Coucou le back'));

app.listen(port, () => console.log(`Listening on port ${port}`));