const express = require('express');
const app = express();
const port = process.env.APP_PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));


const cocktailsHandlers = require('../server/handlers/cocktailsHandlers');
app.get('/', (req, res) => res.send('Coucou le back'));

app.get('/api/cocktails', cocktailsHandlers.getCocktails);
