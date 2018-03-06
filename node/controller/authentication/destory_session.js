let sessionOption = require('../../config/session');

module.exports = function({req, res, callback}){
    req.session.destroy((err)=>{
        if(err) res.send({success: false});
        res.clearCookie(sessionOption.name);

        if(callback){
            callback();
        }
    })
}