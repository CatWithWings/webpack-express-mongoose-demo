let jwt = require('jwt-simple'),
    authenticationModal = require('../../modal/authentication'),
    sessionOption = require('../../config/session'),
    errors = require('../../config/errors'),
    destorySession = require('./destory_session'),
    getSession = require('./get_session'),
    share = require('./share'),
    checkLocked = require('./check_locked');

module.exports = function({
    app,
    req, 
    res,
    next
}){
    getSession(req, res)
        .then((sessionResult)=>{
        let session = (!sessionResult) ? {} : sessionResult,
            token = session._csrf;

        try{ 
            let decoded = jwt.decode(token, app.get('jwtTokenSecret'));

            checkLocked(req, res, next, session, decoded)
        }catch(err){
            destorySession({req, res, callback:()=>{
                res.redirect(share.LOGIN_ROUTER);
            }});
        }
    }).catch((err)=>{
        console.log('get session error:', err)
    })
}