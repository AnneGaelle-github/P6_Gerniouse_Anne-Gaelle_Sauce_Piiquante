// Routes des nouveaux utilisateurs + connection d'un utlisateur

const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup); // Création d'un nouvel utilisateur
router.post('/login', userCtrl.login); // Connection d'un utilisateur


module.exports = router;