/**
 * Redirects to the main page '/'
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        res.redirect('/');
    };
};