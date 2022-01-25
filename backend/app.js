// Application Express

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet");
require('dotenv').config();


const app = express();

// Sécurisation de l'applications Express

app.use(mongoSanitize()); // Pour éviter les injections mongodb
app.use(helmet.xssFilter()); // Prévenention des attaques XSS

 // Routes

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');


// Connexion à la base de données MongoDB Atlas

mongoose.connect('mongodb+srv://'+process.env.ID_DB+':'+process.env.PASS_DB+'@cluster0.mm3fb.mongodb.net/test?retryWrites=true&w=majority', 
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.error('Connexion à MongoDB échouée !'));

// Les CORS qui gère les requetes HTTP

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8081');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json()); // Prend toutes les requêtes qui ont comme Content-Type du JSON

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;