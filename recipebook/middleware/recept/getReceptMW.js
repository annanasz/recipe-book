/**
 * Gets the attributes of a recipe from the database.
 * The recipe is specified by its id(:receptid).
 * The result is stored in res.locals.recipe
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        const ReceptModel = objectrepository.ReceptModel;
        if (typeof req.params.adag !== 'undefined')
            res.locals.portion = req.params.adag;
        ReceptModel.findOne({
            _id: req.params.receptid
        }, (err, recipe) => {
            if (err) {
                return next(err);
            }
            if (recipe === null) {
                return next();
            }
            res.locals.recipe = recipe;
            return next();
        });
    };
};