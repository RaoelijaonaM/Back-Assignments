const express = require('express');
const { verifyAccessToken } = require('./middleware');
let router = express.Router();
let Matiere = require('../model/matiere');

router.route('/').get(verifyAccessToken, (req, res) => {
  Matiere.find((err, matieres) => {
    if (err) {
      res.send(err);
    }
    res.send(matieres);
  });
});

module.exports = router;
