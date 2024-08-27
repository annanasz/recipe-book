/**
 * Deletes the recipe specified by :receptid, then
 * redirects to '/'
 * The entity used is res.locals.recipe
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof res.locals.recipe === 'undefined') {
            return next();
        }
        return res.locals.recipe.remove(err => {
            if (err) {
                return next(err);
            }
            return res.redirect('/');
        });
    };
};