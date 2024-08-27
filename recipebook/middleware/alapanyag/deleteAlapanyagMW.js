/**
 *  Deletes the specified ingredient from the database (by id). 
 *  If the ingredient is a part of a recipe, the user gets a warning and the ingredient doesnt get deleted.
 *  Redirects to '/alapanyag'.
 *  
 *  The entity used is res.locals.ingredient.
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        const ReceptModel = objectrepository.ReceptModel;
        if (typeof res.locals.ingredient === 'undefined') {
            return next();
        }
        const ingredientToDelete = res.locals.ingredient;
        ReceptModel.findOne({ ingredients: { $elemMatch: { ingredient: ingredientToDelete._id } } },
            (err, recipe) => {
                if (err) {
                    return next(err);
                }
                if (recipe === null)
                    return ingredientToDelete.remove(err => {
                        if (err) {
                            return next(err);
                        }
                        return res.redirect('/alapanyag');
                    });
                return res.redirect('/alapanyag?err=delete');
            });

    };
};