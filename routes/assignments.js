const express = require('express');
let router = express.Router();
let Assignment = require('../model/assignment');

//Récupérer tous les assignments (GET)
router
  .route('/')
  .get((req, res) => {
    var aggregateQuery = Assignment.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'idAuteur',
          foreignField: 'idUser',
          as: 'auteur',
        },
      },
      {
        $lookup: {
          from: 'matieres',
          localField: 'idMatiere',
          foreignField: 'idMatiere',
          as: 'matiere',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'matiere.idUser',
          foreignField: 'idUser',
          as: 'prof',
        },
      },
    ]);
    Assignment.aggregatePaginate(
      aggregateQuery,
      {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
      },
      (err, assignments) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).json(assignments);
        }
      }
    );
  })
  // Ajout d'un assignment (POST)
  .post((req, res) => {
    let newAssignment = new Assignment();

    newAssignment.id = req.body.id;
    newAssignment.idAuteur = req.body.idAuteur;
    newAssignment.idMatiere = req.body.idMatiere;
    newAssignment.libelle = req.body.libelle;
    newAssignment.dateRendu = req.body.dateRendu; //NEED FORMATTER?
    newAssignment.note = req.body.note;
    newAssignment.rq = req.body.rq;
    newAssignment.rendu = req.body.rendu;

    console.log('POST assignment reçu :');
    console.log(newAssignment);

    newAssignment.save((err) => {
      if (err) {
        console.log('err', err);
        res.send('cant post assignment ', err);
      }
      res.json({ message: `${newAssignment.libelle} saved!` });
    });
  })
  //update assignment
  .put((req, res) => {
    console.log('UPDATE recu assignment : ');
    console.log(req.body);
    Assignment.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true },
      (err, assignment) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.json({ message: 'updated' });
        }
        // console.log('updated ', assignment)
      }
    );
  });

// Récupérer un assignment par son id (GET)
router
  .route('/:id')
  .get((req, res) => {
    let assignmentId = req.params.id;
    Assignment.findOne({ id: assignmentId })
      .populate({
        path: 'matiere',
        populate: {
          path: 'prof',
        },
      })
      .populate('auteur')
      .exec((err, assignments) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).json(assignments);
        }
      });
  })
  // suppression d'un assignment (DELETE)
  .delete((req, res) => {
    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
      if (err) {
        console.log('erreur', err);
        res.send(err);
      } else {
        console.log('assignment supprimé', assignment);
        res.json({ message: `${assignment.nom} deleted` });
      }
    });
  });

module.exports = router;
