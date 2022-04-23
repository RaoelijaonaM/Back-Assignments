let mongoose = require('mongoose');
let User = require('../model/user');
let Schema = mongoose.Schema;

let MatiereSchema = new Schema({
    idMatiere:Number,
    libelle:String,
    idUser:Number,
    image:String
},{
    collection: 'matieres',
    timestamps: true
  });
MatiereSchema.virtual('prof', {
    ref: [User],
    localField: 'idUser',
    foreignField: 'idUser',
    justOne: true
});
MatiereSchema.set('toJSON', { virtuals: true });
MatiereSchema.set('toObject', { virtuals: true });
// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('matieres', MatiereSchema, 'matieres');
