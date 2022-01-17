// Logique métiers des nouveaux utilisateurs + connection d'un utlisateur

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// Création d'un nouvel utilisateur

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // Le mot de passe sera 'haser' 10 fois par la fonction de hashage 'bcrypt'
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save() // Le nouvel utilisateur est enregistré dans la base de données
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => {
            console.error(error);
            res.status(400).json({ error })
          });
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error });
      });
  };

// Connection d'un utilisateur

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) // Trouve l'utilisateur grace à son email
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password) // bcrypt compare le mot de passe qui a été hasher avec celui qui a été enregistré dans la base de données
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign( // La fonction 'sign' de 'jsonwebtoken' sert à encoder un nouveau TOKEN
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' } // La durée de validité du token est de 24 heures. L'utilisateur devra se reconnecter au bout de 24 heures
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };