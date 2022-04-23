let Assignment = require('../model/assignment');

//Récupérer tous les assignments (GET)
function getAssignments(req, res) {
    Assignment.find()
        .populate({
            path: 'matiere',
            populate: {
                path: 'prof',
            }
        })
        .populate('auteur')
        .exec((err, assignments) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(assignments);
            }
        });
}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res) {
    let assignmentId = req.params.id;
    Assignment.findOne({ id: assignmentId })
        .populate({
            path: 'matiere',
            populate: {
                path: 'prof',
            }
        })
        .populate('auteur')
        .exec((err, assignments) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(assignments);
            }
        });
}

// Ajout d'un assignment (POST)
function postAssignment(req, res) {
    let assignment = new Assignment();
    assignment.id = Math.floor(Math.random() * 100);
    assignment.nom = req.body.nom;
    assignment.dateRendu = req.body.dateRendu;
    assignment.rendu = req.body.rendu;

    console.log("POST assignment reçu :");
    console.log(assignment)

    assignment.save((err) => {
        if (err) {
            console.log("err", err);
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.nom} saved!` })
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            res.json({ message: 'updated' })
        }

        // console.log('updated ', assignment)
    });

}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {
    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            console.log("erreur", err);
            res.send(err);
        }
        else {
            console.log("assignment supprimé", assignment);
            res.json({ message: `${assignment.nom} deleted` });
        }
    })
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };
