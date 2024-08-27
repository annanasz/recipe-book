/**
 * Loads all the ingerdients and their attributes from the database, so 
 * they can be listed for the user. 
 * The result is stored in res.locals.ingredients and if the user tried to delete an ingredient
 * which is used in a recipe, res.locals.error indicates the error.
 */

module.exports = function (objectrepository) {
    const AlapanyagModel = objectrepository.AlapanyagModel;
    return function (req, res, next) {
        var error = req.query.err;
        res.locals.error = error;
        AlapanyagModel.find({}, (err, ingredients) => {
            if (err) {
                return next(err);
            }
            res.locals.ingredients = ingredients;
            return next();
        });
    };
};