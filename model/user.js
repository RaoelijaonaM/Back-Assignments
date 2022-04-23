let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let UsersSchema = new Schema({
    idUser:Number,
    nom:String,
    mdp:String,
    role:Number,
},{
    collection: 'users',
    timestamps: true
  });
module.exports = mongoose.model('User', UsersSchema, 'users');