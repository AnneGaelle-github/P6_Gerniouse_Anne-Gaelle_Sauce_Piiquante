// Routes de la partie stuff de l'application 

const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');



router.post('/', stuffCtrl.createThing); // Créer des Things dans la base de données
router.put('/:id', stuffCtrl.modifyThing); // Modification d'un Thing existant  
router.delete('/:id', stuffCtrl.deleteThing); // Suppression d'un Thing
router.get('/:id', stuffCtrl.getOneThing); // Récupération d'un Thing spécifique
router.get('/', stuffCtrl.getAllThings); // Récupération de tout les Things en vente


module.exports = router;