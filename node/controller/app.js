let userServer = require('./user'),
    homeServer = require('./home');

module.exports = function(app, http) {
    userServer(app);
    homeServer(app);
}