let bcrypt = require('bcrypt'),
    User = require('../schemas/user').Users,
    errors = require('../config/errors'),
    authenticationModal = require('../modal/authentication');

module.exports = {

    vaildateEmail: function(data){
        console.log('/api/user/register/valid_email', data);

        return new Promise((resolve, reject)=>{
            User.count({email: data}, (err, count)=>{
                if(err) reject({msg: err, success: false});
                resolve({msg: 'success', success: true, count});
            })
        })
    },

    register: function(data){
        console.log('/api/user/register: ', data);

        const saltRounds = 10,
            salt = bcrypt.genSaltSync(saltRounds);

        let createdDate = new Date().getTime(),
            info = data,
            user = new User({ 
                email : data.email, 
                password : bcrypt.hashSync(data.password, salt),  
                created_date: createdDate,
                last_login_date : null,
                last_logout_date : null,
                last_login_ip: data.lastLoginIp
            });

        return new Promise((resolve, reject)=>{
            user.save((err)=>{
                if(err) reject(err);
                resolve('success');
            });
        })
    },

    login: function(data){
        console.log('/api/user/login: ', data);

        let email = data.email,
            password = data.password,
            last_login_date = data.lastLoginDate,
            last_login_ip = data.lastLoginIp,
            sid = data.sId;

        return new Promise((resolve, reject)=>{ 
            User.find({email: email})
                .select('_id password')
                .exec((err, result)=>{
                    let res = {msg: err, success: false, login: false,content: null};
                    if(err) reject( Object.assign({}, res, {msg: err}));

                    let resultLen = result.length,
                        passwordResult = (resultLen == 0) ? '' : result[0].password,
                        pwdFlag = bcrypt.compareSync(password, passwordResult);

                    if(resultLen === 0 || !pwdFlag){
                        resolve(Object.assign({}, res, {success: true, msg: errors.NOT_EXIT}));
                    }else{
                        authenticationModal.checkLocked(email)
                            .then((resultData)=>{
                                let locked = resultData.locked;
                                switch(locked){
                                    case false: // unlocked
                                        User.update(
                                            {email: email},
                                            {
                                                last_login_date: last_login_date, 
                                                last_login_ip: last_login_ip,
                                                sid: sid,
                                            }, (err, docs)=>{
                                                if(err) reject(Object.assign({}, res, {msg:err}));
                                                resolve(
                                                    Object.assign( {}, res, {
                                                        success: true, 
                                                        login: true,
                                                        content: { 
                                                            id: result[0]._id, 
                                                            email:email,
                                                            lastLoginDate: last_login_date
                                                        }
                                                    })
                                                )
                                            })
                                            break;

                                    default: // locked
                                        resolve(Object.assign(
                                            {}, 
                                            res, 
                                            {success: true, msg: errors.LOCKED}
                                        ));
                                        break;
                                    }
                                }).catch((err)=>{
                                    console.log(err.msg)
                                })
                    }
                })
        })
    },

    logout: function(data){
        console.log('/api/user/logout: ', data);

        let last_logout_date = new Date().getTime();

        return new Promise((resolve, reject)=>{
            User.update(
                {_id: data},
                {
                    last_logout_date: last_logout_date
                }, (err, docs)=>{
                    if(err) reject({msg: err, logout: false});
                    resolve({msg:'', logout: true});
                })
        })
    }
}