'use strict';
var jwt = require('jsonwebtoken');
const express = require('express');
const User = require('../model/user');
const { verifyAccessToken } = require('./middleware');
let router = express.Router();

router.use(function (req, res, next) {
  console.log('middleware user request : ', req.url, '@', Date.now());
  next();
});

router.route('/login').post((req, res) => {
  const nom = req.body.nom;
  const mdp = req.body.mdp;
  User.findOne({
    nom: nom,
    mdp: mdp,
  }).exec((err, user) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      if (user) {
        const tokenUser = jwt.sign({ user }, 'secret', { expiresIn: '2h' });
        return res.status(200).json({ auth: true, token: tokenUser });
      } else {
        return res.status(404).json('Login failed');
      }
    }
  });
});

//get all users
router
  .route('/')
  .get(verifyAccessToken, (req, res) => {
    User.find().exec((err, users) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(users);
      }
    });
  })
  .post((req, res) => {});

//get user by idUser
router.route('/:id').get(verifyAccessToken, (req, res) => {
  const idUser = req.params.id;
  User.find({ idUser: idUser }).exec((err, users) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(users);
    }
  });
});

module.exports = router;
