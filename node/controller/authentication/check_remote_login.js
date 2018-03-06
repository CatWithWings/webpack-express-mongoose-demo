let authenticationModal = require('../../modal/authentication'),
    destorySession = require('./destory_session'),
    errors = require('../../config/errors'),
    share = require('./share'),
    checkIdentity = require('./check_identity');

module.exports = function(req, res, next, session, decoded){
    authenticationModal.checkLogined(decoded.email)
        .then((resultData)=>{
            let sIdInDB = resultData.sIdInDB,
                sIdCurrent = session.sId,
                ifAjax = req.xhr;
                          
            if(sIdInDB == sIdCurrent){ // not remote login
                checkIdentity(req, res, next, session, decoded);
            }else{
                let msg = errors.LOGINED;

                destorySession({req, res, callback:()=>{
                    ifAjax ? 
                        res.send({status: 401, msg: msg}) :
                        res.redirect(share.AUTHENTICATION_ROUTER+'?msg='+msg);
                }});
            }
    }).catch((err)=>{
        console.log(err.msg);
    })
}