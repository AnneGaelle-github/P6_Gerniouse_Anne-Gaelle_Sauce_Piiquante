// Schéma de données pour les objets qui seront mis en vente

const mongoose = require('mongoose');

// Les objets en ventes devrons contenir les champs suivants :

const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Thing', thingSchema);