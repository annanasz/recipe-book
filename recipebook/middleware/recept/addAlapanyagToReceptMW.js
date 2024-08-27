/**
 * Adds a new ingredient to the specified recipe(res.locals.reciepe) and inserts the new ingredient
 * to the Alapanyags collection in the database.
 * Calculates the new price and calories of the recipe with the new ingredient.
 * If all attributes of the new ingredient arent provided, the user gets a warning.
 */

const { check, validationResult } = require("express-validator");
module.exports = function (objectrepository) {
    return function (req, res, next) {
        if ((typeof req.body.iname === 'undefined') ||
            (typeof req.body.iunit === 'undefined') ||
            (typeof req.body.iprice === 'undefined') ||
            (typeof req.body.icalories === 'undefined')) {
            return next();
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.locals.alert = errors.array();
            return next();
        }
        const AlapanyagModel = objectrepository.AlapanyagModel;
        const newIngredient = new AlapanyagModel();
        newIngredient.name = req.body.iname;
        quantity = req.body.iquantity;
        newIngredient.unit = req.body.iunit;
        newIngredient.price = req.body.iprice;
        newIngredient.calories = req.body.icalories;
        const recipe = res.locals.recipe;
        newIngredient.save(err => {
            if (err) {
                return next(err);
            }
            res.locals.newingredient = newIngredient;
            const id = res.locals.newingredient._id;
            var ing = { ingredient: id, quantity: quantity };
            recipe.ingredients[recipe.ingredients.length] = ing;
            recipe.price = recipe.price + quantity * newIngredient.price;
            recipe.calories = recipe.calories + quantity * newIngredient.calories;
            recipe.save(err => {
                if (err) {
                    return next(err);
                }
                res.locals.recipe = recipe;
                return next();
            });
        });

    };
};