module.exports = function(req, res){
    return new Promise(function (resolve, reject) {
        req.sessionStore.get(req.session.id, (err, session)=>{
            if(err) reject(err);
            
            resolve(session);
        })
    });
}