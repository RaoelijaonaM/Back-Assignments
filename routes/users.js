'use strict';
const express = require('express');
const User = require('../model/user');
let router = express.Router();

router.use(function (req, res, next) {
  console.log(req.url, '@', Date.now());
  next();
});

router.route('/').get((req, res) => {
  User.find().exec((err, users) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(users);
    }
  });
});

router.route('/:id').get((req, res) => {
  const idUser = req.params.id;
  User.find({ idUser: idUser }).exec((err, users) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(users);
    }
  });
});

router.route('/').post((req, res) => {
  const nom = req.body.nom;
  const mdp = req.body.mdp;
  User.find({
    nom: nom,
    mdp: mdp,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(user);
    }
  });
});

module.exports = router;
