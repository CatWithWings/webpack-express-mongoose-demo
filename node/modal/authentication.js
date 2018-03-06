let jwt = require('jwt-simple');

let User = require('../schemas/user').Users;

module.exports = {
    getSession: function(){

    },
    
    setToken: function(app, data){
        const TOKEN = jwt.encode(data, app.get('jwtTokenSecret'));
        return TOKEN;
    },

    checkLocked: function(data){
        return new Promise((resolve, reject)=>{ 
            User.find({email: data})
                .select('locked')
                .exec((err, result)=>{
                    if(err) reject({success: false, msg:'check locked failed'});
                    if(result.length === 0){
                        reject({success: false, msg:'account not exit when check locked'});
                    }else{
                        resolve({success: true, msg:'', locked: result[0].locked});
                    }
                })
        })
    },

    checkToken: function(data){
        return new Promise((resolve, reject)=>{ 
            User.find({_id: data})
                .select('email')
                .exec((err, result)=>{
                    if(err) reject({success: false});
                    if(result.length == 0 ){
                        resolve({success: false});
                    }else{
                        resolve({success: true});
                    }
            })
        })
    },

    checkLogined: function(data){
        return new Promise((resolve, reject)=>{ 
            User.find({email: data})
                .select('sid')
                .exec((err, result)=>{
                    if(err) reject({success: false, msg:'check logined failed'});
                    if(result.length === 0){
                        reject({success: false, msg:'account not exit when check logined'});
                    }else{
                        resolve({success: true, msg:'', sIdInDB: result[0].sid});
                    }
                })
        })

    }
}