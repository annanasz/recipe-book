/**
 * Loads all the recipes and their attributes which belong to the specified category from the database, so 
 * they can be listed for the user. 
 * The result is stored in res.locals.recipes
 */


module.exports = function (objectrepository) {
    return function (req, res, next) {
        const ReceptModel = objectrepository.ReceptModel;
        var categories = ["reggeli", "ebed", "vacsora", "desszert"];
        var searchcategory = req.params.category;
        if (!categories.includes(searchcategory)) {
            return res.redirect('/');
        }
        ReceptModel.find({ category: searchcategory }, (err, recipes) => {
            if (err) {
                return next(err);
            }
            res.locals.recipes = recipes;
            return next();
        })
    };
};