const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Recept = db.model('Recept',{
    name: {type: String, required: true},
    price: {type: Number, required: true},
    calories: {type: Number, required: true},
    description: {type: String, required: true},
    ingredients: [
        {
            ingredient:{type: Schema.Types.ObjectId,ref:'Alapanyag'},
            quantity: {type: Number}
        }
    ],
    category: String
});

module.exports = Recept;