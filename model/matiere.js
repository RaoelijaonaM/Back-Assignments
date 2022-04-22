const mongoose = require('mongoose');
const Schema = mongoose.Schema

let schemaMatiere = Schema({
    idMatiere: Number,
    libelle:String,
    idUser:Number,
    image:String
})

module.exports = mongoose.model('matieres', schemaMatiere);

