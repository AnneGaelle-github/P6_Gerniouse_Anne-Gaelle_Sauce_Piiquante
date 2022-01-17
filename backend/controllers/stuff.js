// Logique métiers de la partie stuff de l'application

const Thing = require('../models/thing');


// Créer des Things dans la base de données

exports.createThing = (req, res, next) => {
    delete req.body._id; // Suppresion du faux ID envoyé par le front-end
    const thing = new Thing({
      ...req.body // L'opérateur spread ... est utilisé pour faire une copie de tous les éléments de req.body
    });
    thing.save() // Enregistre le things dans la base de données
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };

// Modification d'un Thing existant 

exports.modifyThing = (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
}

// Suppression d'un Thing

exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
}

// Récupération d'un Thing spécifique

exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id }) // findOne() trouve un Thing unique ayant le même _id que le paramètre de la requête
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
}

// Récupération de tout les Things en vente

exports.getAllThings = (req, res, next) => {
    Thing.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
}