/**
 * Saving ingredients to the database
 * If its a new ingredient, saves as new in the database,
 * if the user wants to edit an existing ingredient it gets updated in the 
 * database.
 * Redirects to /alapanyag in case of success, in case of failure the user gets
 * an error message.
 * If all the attributes of an igredient arent provided, the user gets a warning.
 * If the ingredient is in a recipe it cant be deleted, the user gets a warning.
 */
const { check, validationResult } = require("express-validator");
module.exports = function (objectrepository) {
    const AlapanyagModel = objectrepository.AlapanyagModel;
    const ReceptModel = objectrepository.ReceptModel;
    return function (req, res, next) {
        if ((typeof req.body.name === 'undefined') ||
            (typeof req.body.unit === 'undefined') ||
            (typeof req.body.price === 'undefined') ||
            (typeof req.body.calories === 'undefined')) {
            return next();
        }
        const newIngredient = res.locals.ingredient ? res.locals.ingredient : new AlapanyagModel();
        typeof req.params.alapanyagid === 'undefined' ? res.locals.method = "new" : "";
        const addIngredient = ()=>{
            newIngredient.name = req.body.name;
                    newIngredient.unit = req.body.unit;
                    newIngredient.price = req.body.price;
                    newIngredient.calories = req.body.calories;
                    res.locals.ingredient = newIngredient;
                    const errors = validationResult(req);
                    if (!errors.isEmpty()) {
                        res.locals.alert = errors.array();
                        return next();
                    }
                    return newIngredient.save(err => {
                        if (err) {
                            return next(err);
                        }
                        res.redirect('/alapanyag');
                    });
        }
        if (typeof req.params.alapanyagid !== 'undefined')
            ReceptModel.findOne({ ingredients: { $elemMatch: { ingredient: req.params.alapanyagid } } },
                (err, recipe) => {
                    if (err) {
                        return next(err);
                    }
                    if (recipe !== null)
                        return res.redirect('/alapanyag?err=edit');
                    addIngredient();
                });
        else{
            addIngredient();
        }
    };
};