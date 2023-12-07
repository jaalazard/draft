require("dotenv").config();
const express = require('express');
const cors = require('cors'); // Ajoutez cette ligne
const app = express();
const port = process.env.APP_PORT || 5000;
const cookieParser = require('cookie-parser');
const router = require('./router');
const authRouter = require('./auth');
// Configurez CORS avec les options souhaitées
app.use(cors({
  origin: 'http://localhost:5173', // Remplacez par l'URL de votre application frontend
  credentials: true, // Si vous utilisez des cookies ou une authentification basée sur des sessions
}));

app.use(express.json());
app.use(cookieParser());

app.use(router);
app.use(authRouter);

const cocktailsHandlers = require('../server/handlers/cocktailsHandlers');
app.get('/', (req, res) => res.send('Coucou le back'));

app.get('/api/cocktails', cocktailsHandlers.getCocktails);
app.get(`/api/cocktails/:id`, cocktailsHandlers.getCocktailById);

app.listen(port, () => console.log(`Listening on port ${port}`));
