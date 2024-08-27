/**
 * Gets the attributes of an ingredient from the database.
 * The ingredient is specified by its id(:alapanyagid).
 * The result is stored in res.locals.ingredient
 */

module.exports = function (objectrepository) {
    const AlapanyagModel = objectrepository.AlapanyagModel;
    return function (req, res, next) {
        AlapanyagModel.findOne({
            _id: req.params.alapanyagid
        }, (err, ingredient) => {
            if (err) {
                return next(err);
            }
            if (ingredient === null) {
                return next();
            }
            res.locals.ingredient = ingredient;
            return next();
        });
    };
};