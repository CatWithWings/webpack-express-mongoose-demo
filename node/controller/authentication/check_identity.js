let authenticationModal = require('../../modal/authentication'),
    destorySession = require('./destory_session'),
    errors = require('../../config/errors'),
    share = require('./share');

module.exports = function(req, res, next, session, decoded){
    let now = new Date().getTime(),
        ifAjax = req.xhr,
        callback = ()=>{
            let msg = errors.TOKEN_TIMEOUT;

            ifAjax ? 
                res.send({status: 401, msg: msg}) :
                res.redirect(share.AUTHENTICATION_ROUTER+'?msg='+msg);
        };

    if( (now - decoded.lastLoginDate) > share.MAX_TIME_LIMIT ){ // login timeout
        destorySession({req, res, callback: callback});
    }else{ // 验证身份
        authenticationModal.checkToken(decoded.id)
            .then((resultData)=>{
                if(resultData.success){
                    next();
                }else{
                    destorySession({req, res, callback: callback});
                }
            }).catch((err)=>{
                console.log('checked token failed');
            })
    }
}