/** 
 * Puts all the ingredients and quantities of the specified recipe(res.locals.recipe) to res.locals.allingredients,
 * so we can list them to the user.
 * 
*/

module.exports = function (objectrepository) {
    return function (req, res, next) {
        const AlapanyagModel = objectrepository.AlapanyagModel;
        const recipe = res.locals.recipe;
        var ingredientsarray = [];
        var quantities = [];
        const getIngr = id =>
            new Promise(resolve => {
                AlapanyagModel.findOne({
                    _id: id
                }, (err, ingredient) => {
                    if (err) {
                        return next(err);
                    }
                    if (ingredient === null) {
                        return next();
                    }
                    resolve(ingredient);
                });
            });
        const getIngredients = async () => {
            for (let i = 0; i < recipe.ingredients.length; i++) {
                ingredientsarray[i] = await getIngr(recipe.ingredients[i].ingredient);
                quantities[i] = recipe.ingredients[i].quantity;
            }
            res.locals.allingredients = ingredientsarray;
            res.locals.quantities = quantities;
            return next();
        }
        getIngredients();
    };
};

