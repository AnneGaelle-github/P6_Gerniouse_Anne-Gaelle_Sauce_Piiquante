// Schéma de données pour les sauces qui seront mis en vente

const mongoose = require('mongoose');

// Les sauces en ventes devrons contenir les champs suivants :

const sauceSchema = mongoose.Schema({
  userId: { type: String, require: true },
  name: { type: String, require: true },
  manufacturer: { type: String, require: true },
  description: { type: String, require: true },
  mainPepper: { type: String, require: true },
  imageUrl: { type: String },
  heat: { type: Number, require: true },
  likes: { type: Number, require: true, default: 0 },
  dislikes: { type: Number, require: true, default: 0 },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] }
});

module.exports = mongoose.model('Sauce', sauceSchema);