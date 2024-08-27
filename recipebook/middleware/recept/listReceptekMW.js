/**
 * Loads all the recipes and their attributes from the database, so 
 * they can be listed for the user. 
 * The result is stored in res.locals.recipes
 */


module.exports = function (objectrepository) {
    const ReceptModel = objectrepository.ReceptModel;
    return function (req, res, next) {
        ReceptModel.find({}, (err, recipes) => {
            if (err) {
                return next(err);
            }
            res.locals.recipes = recipes;
            return next();
        })
    };
};