const uuidv1 = require('uuid/v1');

module.exports = {
    name: 'sessionUserId',
    saveUninitialized: false,
    resave: false,
    rolling: true,
    genid: function(req) {
        return uuidv1() // use UUIDs for session IDs 
    },
    cookie: {
        secure: false,
        maxAge: 28800000
    }
}