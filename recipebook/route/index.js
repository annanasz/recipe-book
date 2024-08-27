const renderMW = require('../middleware/general/renderMW')
const redirectMainMW = require('../middleware/general/redirectMainMW')

const listReceptekMW = require('../middleware/recept/listReceptekMW');
const listReceptekByCatMW = require('../middleware/recept/listReceptekByCatMW');
const getReceptMW = require('../middleware/recept/getReceptMW');
const saveReceptMW = require('../middleware/recept/saveReceptMW');
const deleteReceptMW = require('../middleware/recept/deleteReceptMW');
const addAlapanyagToReceptMW = require('../middleware/recept/addAlapanyagToReceptMW');
const addAlapanyagsToLocalsMW = require('../middleware/recept/addAlapanyagsToLocalsMW');
const deleteAlapanyagFromReceptMW = require('../middleware/recept/deleteAlapanyagFromReceptMW');
const addExistingIAlapanyagToReceptMW = require('../middleware/recept/addExistingIAlapanyagToReceptMW');

const listAlapanyagokMW = require('../middleware/alapanyag/listAlapanyagokMW');
const getAlapanyagMW = require('../middleware/alapanyag/getAlapanyagMW');
const saveAlapanyagMW = require('../middleware/alapanyag/saveAlapanyagMW');
const deleteAlapanyagMW = require('../middleware/alapanyag/deleteAlapanyagMW');

const { check, validationResult } = require('express-validator');

const ReceptModel = require('../models/recept');
const AlapanyagModel = require('../models/alapanyag');
const { render } = require('ejs');

module.exports = function (app) {
    const objRepo = {
        ReceptModel: ReceptModel,
        AlapanyagModel: AlapanyagModel
    };

    app.get('/',
        listReceptekMW(objRepo),
        renderMW(objRepo, 'index'));
    
    app.get('/category/:category',
        listReceptekByCatMW(objRepo),
        renderMW(objRepo, 'index'));

    app.get('/category',
        listReceptekByCatMW(objRepo),
        renderMW(objRepo, 'index'));

    app.get('/recept',
        redirectMainMW(objRepo));

    app.use('/recept/new',
        check('name',"Add meg a recept nevét!").isLength({min:1}),
        check('description',"Add meg a recept leírását!").isLength({min:1}),
        saveReceptMW(objRepo),
        saveAlapanyagMW(objRepo),
        renderMW(objRepo, 'receptmodositas'));

    app.post('/recept/addingredient/:receptid/:alapanyagid',
        getAlapanyagMW(objRepo),
        getReceptMW(objRepo),
        addExistingIAlapanyagToReceptMW(objRepo));

    app.use('/recept/addingredient/:receptid',
        check('iname').isLength({min:1}),
        check('iquantity').isLength({min:1}),
        check('iunit').isLength({min:1}),
        check('iprice').isLength({min:1}),
        check('icalories').isLength({min:1}),
        listAlapanyagokMW(objRepo),
        getReceptMW(objRepo),
        addAlapanyagToReceptMW(objRepo),
        addAlapanyagsToLocalsMW(objRepo),
        renderMW(objRepo,'alapanyagmegadas'));

    app.get('/recept/deleteingredient/:receptid/:alapanyagid/:quantity',
        getAlapanyagMW(objRepo),
        getReceptMW(objRepo),
        deleteAlapanyagFromReceptMW(objRepo));

    app.use('/recept/edit/:receptid',
        getReceptMW(objRepo),
        saveReceptMW(objRepo),
        renderMW(objRepo,'receptmodositas'));

    app.get('/recept/delete/:receptid',
        getReceptMW(objRepo),
        deleteReceptMW(objRepo));

    app.get('/recept/:receptid/:adag',
        getReceptMW(objRepo),
        addAlapanyagsToLocalsMW(objRepo),
        renderMW(objRepo, 'receptmegjelenit'));
    
    app.get('/alapanyag',
        listAlapanyagokMW(objRepo),
        renderMW(objRepo, 'alapanyagok'));

    app.use('/alapanyag/new',
        check('name').isLength({min:1}),
        check('unit').isLength({min:1}),
        check('price').isLength({min:1}),
        check('calories').isLength({min:1}),
        saveAlapanyagMW(objRepo),
        renderMW(objRepo, 'alapanyagmodositas'));
    
    app.use('/alapanyag/edit/:alapanyagid',
        check('name').isLength({min:1}),
        check('unit').isLength({min:1}),
        check('price').isLength({min:1}),
        check('calories').isLength({min:1}),
        getAlapanyagMW(objRepo),
        saveAlapanyagMW(objRepo),
        renderMW(objRepo, 'alapanyagmodositas'));        
    
    app.get('/alapanyag/delete/:alapanyagid',
        getAlapanyagMW(objRepo),
        deleteAlapanyagMW(objRepo));

};