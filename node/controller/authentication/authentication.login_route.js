let jwt = require('jwt-simple'),
    authenticationModal = require('../../modal/authentication'),
    getSession = require('./get_session'),
    share = require('./share');

 /* 
  * login router: only check token
  */
module.exports = function ({
    app,
    req,
    res,
    next
}) {
    getSession(req, res)
        .then((session) => {
            try {
                let token = (!session) ? '' : session._csrf,
                    now = new Date().getTime(),
                    decoded = jwt.decode(token, app.get('jwtTokenSecret'));

                authenticationModal.checkToken(decoded.id)
                    .then((resultData) => {
                        if (resultData.success) {
                            res.redirect(share.HOME_ROUTER)
                        } else {
                            next();
                        }
                    }).catch((err) => {
                        console.log('checked token failed');
                    })
            } catch (err) {
                next()
            }
        }).catch((err) => {
            console.log('get session error:', err)
        })
}