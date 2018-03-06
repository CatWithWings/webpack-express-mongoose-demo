let fs = require('fs'),
    path = require('path'),
    JSEncrypt = require('node-jsencrypt'),
    jwt = require('jwt-simple'),
    stringRandom = require('string-random'),
    sessionOption = require('../config/session'),
    destorySession = require('./authentication/destory_session');

let userModal = require('../modal/user'),
    authenticationModal = require('../modal/authentication');

module.exports = function(app){

    /**
     * send public key to the customer
     */
    app.get('/api/user/get_key', (req, res)=>{
        let publicKey = fs.readFileSync(
            path.join(__dirname, '../../keys/rsa_1024_pub.pem')
        ).toString();
        
        res.send({key: publicKey});
    })

    /**
     * valid if email is repeat
     */
    app.get('/api/user/register/valid_email', (req, res)=>{
        let email = req.query.email;

        userModal.vaildateEmail(email)
            .then((result)=>{
                let status = result.success,
                    count = result.count,
                    msg = result.msg;
                
                if(status){
                    let passed = (count==0) ? true : false;
                    res.send(passed);
                }else{
                    console.log('vaildateEmail is error: ', msg);
                    res.send(false);
                }
            })
    })

    /**
     * register account
     */
    app.post('/api/user/register', (req, res)=>{ 
        let reqData = req.body,
            createdDate= new Date().getTime(),
            lastLoginIp = req.connection.remoteAddress,
            priveKey = fs.readFileSync(
                path.join(__dirname, '../../keys/rsa_1024_priv.pem')
            ).toString(),
            decrypt = new JSEncrypt();

        decrypt.setPrivateKey(priveKey);
        reqData.password= decrypt.decrypt(reqData.password)
        reqData = Object.assign({}, reqData, {createdDate, lastLoginIp});

        userModal.register(reqData)
            .then((result) => {
                if(result === 'success'){
                    res.send({success: true});
                }else{
                    res.send({success: false});
                }
            });
        
    });

    /**
     * login
     */
    app.post('/api/user/login', (req, res)=>{ 
        let reqData = req.body,
            lastLoginDate= new Date().getTime(),
            lastLoginIp = req.connection.remoteAddress,
            priveKey = fs.readFileSync(
                path.join(__dirname, '../../keys/rsa_1024_priv.pem')
            ).toString(),
            decrypt = new JSEncrypt(),
            sId = stringRandom(32);

        decrypt.setPrivateKey(priveKey);
        reqData.password= decrypt.decrypt(reqData.password)
        reqData = Object.assign({}, reqData, {lastLoginDate, lastLoginIp, sId: sId});
        userModal.login(reqData)
            .then((result)=>{
                if(result.login === false){
                    res.send({success: false, msg: result.msg})
                }else{
                    req.session.sId = sId;
                    req.session._csrf = authenticationModal.setToken(app, result.content);
                    console.log('orgain session.id: ', req.session.id)
                    res.send({
                        success: true, 
                        account: JSON.stringify(result.content),
                    })
                }
            }).catch((error)=>{
                console.log('check login error!')
            })
    });

    /**
     * logout
     */
    app.post('/api/user/logout', (req, res)=>{ 
        req.sessionStore.get(req.session.id, (err, session)=>{
            let token = session._csrf,
               id = jwt.decode(token, app.get('jwtTokenSecret')).id,
               callback= (userModal, id)=>{
                   userModal.logout(id)
                        .then((reqData)=>{
                            if(reqData.logout){
                                res.send({success: true});
                            }else{
                                res.send({success: false});
                            }
                        })
               };

            destorySession({
                req, 
                res, 
                callback: callback.bind(null, userModal, id)
            });
        })
    });
}