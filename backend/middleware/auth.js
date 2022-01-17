// Middleware qui protège et vérifie que l'utilisateur est authentifié avant d'autoriser l'envoi de ses requêtes

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // 'authorization' extrai le token du header et 'split' le récupère
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // 'verify' décode le token
    const userId = decodedToken.userId;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID non valide !';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Requête non authentifiée !')
    });
  }
};