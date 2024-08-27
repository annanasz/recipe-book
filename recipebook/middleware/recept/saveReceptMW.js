/**
 * Saving recipes to the database
 * If its a new recipe, saves as new in the database,
 * if the user wants to edit an existing recipe it gets updated in the 
 * database with the new attribute values.
 * Redirects to /recept/:receptid in case of success, in case of failure the user gets
 * an error message
 */

const { check, validationResult } = require("express-validator");

module.exports = function (objectrepository) {
    const ReceptModel = objectrepository.ReceptModel;
    const AlapanyagModel = objectrepository.AlapanyagModel;
    return function (req, res, next) {
        if ((typeof req.body.name === 'undefined') ||
            (typeof req.body.category === 'undefined') ||
            (typeof req.body.description === 'undefined')) {
            return next();
        }
        const newRecipe = res.locals.recipe ? res.locals.recipe : new ReceptModel();
        newRecipe.name = req.body.name;
        newRecipe.category = req.body.category;
        newRecipe.description = req.body.description;
        newRecipe.price = res.locals.recipe ? res.locals.recipe.price : 0;
        newRecipe.calories = res.locals.recipe ? res.locals.recipe.calories : 0;
        res.locals.recipe = newRecipe;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.locals.alert = errors.array();
            return next();
        }
        return newRecipe.save(err => {
            if (err) {
                return next(err);
            }
            res.redirect('/recept/addingredient/' + newRecipe.id);
        });
        next();
    };
};