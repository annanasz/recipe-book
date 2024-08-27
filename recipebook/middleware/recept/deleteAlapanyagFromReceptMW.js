/**
 * Removes an ingredient(res.locals.ingredient) from a recipe(res.locals.recipe)
 * and refreshes the price and the calories of the recipe.
 * 
 * redirects to '/recept/addingredient/:receptid' so the user can continue to add ingerients to the recipe
 * 
 */
module.exports = function (objectrepository) {
    return function (req, res, next) {
        const ReceptModel = objectrepository.ReceptModel;
        const ingredientToDelete = res.locals.ingredient;
        const recipe = res.locals.recipe;
        const quantity = req.params.quantity;
        var newPrice = recipe.price - quantity * ingredientToDelete.price;
        var newCalories = recipe.calories - quantity * ingredientToDelete.calories;
        ReceptModel.updateOne({ _id: res.locals.recipe._id }, { $pull: { ingredients: { ingredient: req.params.alapanyagid } }, price: newPrice, calories: newCalories },
            (err) => {
                if (err) {
                    return next(err);
                }
                return res.redirect('/recept/addingredient/' + req.params.receptid);
            });
    };
};