/**
 * Adds an ingredient, which already exists in the database, to the specified recipe(res.locals.recipe).
 * redirects to '/recept/addingredient/:receptid' so the user can continue to add ingerients to the recipe
 */
module.exports = function (objectrepository) {
    return function (req, res, next) {
        const recipe = res.locals.recipe;
        const newIngredient = res.locals.ingredient;
        const ingredientquantity = req.body.existingquantity;
        var ing = { ingredient: newIngredient._id, quantity: ingredientquantity };
        recipe.ingredients[recipe.ingredients.length] = ing;
        recipe.price = recipe.price + ingredientquantity * newIngredient.price;
        recipe.calories = recipe.calories + ingredientquantity * newIngredient.calories;
        recipe.save(err => {
            if (err) {
                return next(err);
            }
            res.redirect('/recept/addingredient/' + recipe._id);
        });
    };
};