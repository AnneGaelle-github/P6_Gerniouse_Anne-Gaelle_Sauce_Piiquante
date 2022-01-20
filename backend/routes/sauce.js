// Routes de la partie sauce de l'application 

const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce');


router.post('/', auth, multer, sauceCtrl.createSauce); // Créer des sauces dans la base de données
router.put('/:id', auth, multer, sauceCtrl.modifySauce); // Modification d'une sauce existante  
router.delete('/:id', auth, sauceCtrl.deleteSauce); // Suppression d'une sauce
router.get('/:id', auth, sauceCtrl.getOneSauce); // Récupération d'une sauce spécifique
router.get('/', auth, sauceCtrl.getAllSauce); // Récupération de toutes les sauces en vente
router.post('/:id/like', auth, sauceCtrl.likeSauce); // Créer des likes/dislikes 


module.exports = router;