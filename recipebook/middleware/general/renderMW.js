/**
 * Using the template engine render the values into the template specified
 * by the parameters.
 */

module.exports = function(objectrepository, viewName){
    return function(req, res) {
        res.render(viewName, res.locals);
    };
};