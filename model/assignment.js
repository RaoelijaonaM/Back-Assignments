let mongoose = require('mongoose');
let Matiere = require('../model/matiere');
let User = require('../model/user');
let Schema = mongoose.Schema;
let AssignmentSchema = new Schema({
    id: Number,
    idAuteur: Number,
    idMatiere: Number,
    libelle: String,
    dateRendu: Date,
    note: Number,
    rq: String,
    rendu: Boolean,
}, {
    collection: 'assignments',
    timestamps: true
});
AssignmentSchema.virtual('matiere', {
    ref: [Matiere],
    localField: 'idMatiere',
    foreignField: 'idMatiere',
    justOne: true
});
AssignmentSchema.virtual('auteur', {
    ref: [User],
    localField: 'idAuteur',
    foreignField: 'idUser',
    justOne: true
});
AssignmentSchema.set('toJSON', { virtuals: true });
AssignmentSchema.set('toObject', { virtuals: true });
module.exports = mongoose.model('Assignment', AssignmentSchema, 'assignments');
// module.exports.Matiere = mongoose.model('Matiere', MatiereSchema, 'matieres');
// module.exports.User = mongoose.model('User', UsersSchema, 'users');

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
