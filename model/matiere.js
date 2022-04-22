const mongoose = require('mongoose');
const Schema = mongoose.Schema

let matiere = Schema({
    idMatiere: Number,
    libelle:String,
    idUser:Number,
    image:String
})

module.exports = mongoose.model('matiere', matiere);

