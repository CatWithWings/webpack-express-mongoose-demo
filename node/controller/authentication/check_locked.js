let authenticationModal = require('../../modal/authentication'),
    destorySession = require('./destory_session'),
    errors = require('../../config/errors'),
    share = require('./share'),
    checkRemoteLogin = require('./check_remote_login');

module.exports = function(req, res, next, session, decoded){
    authenticationModal.checkLocked(decoded.email)
        .then((resultData)=>{
            let locked = resultData.locked,
                ifAjax = req.xhr;
            
            if(locked){ // be locked
                let msg = errors.LOCKED;

                destorySession({req, res, callback:()=>{
                    ifAjax ? 
                        res.send({status: 401, msg: msg}) :
                        res.redirect(share.AUTHENTICATION_ROUTER+'?msg='+msg);
                }});
            }else{ // unlocked
                checkRemoteLogin(req, res, next, session, decoded);
            }
        }).catch((err)=>{
            console.log(err.msg)
        })
}