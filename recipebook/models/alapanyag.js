const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Alapanyag = db.model('Alapanyag',{
    name: {type: String, required: true},
    unit: {type: String, required: true},
    price: {type: Number, required: true},
    calories: {type: Number, required: true}
});

module.exports = Alapanyag;
