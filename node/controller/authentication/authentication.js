let handleLoginRoute = require('./authentication.login_route'),
    handleRequest = require('./authentication.request'),
    share = require('./share');

const cluster = require('cluster');

// 获取需要验证的所有路径
function _getEliminate(eliminates){
    let array = [];
                
    for(let key in eliminates){
        array.push(eliminates[key]);
    }
    return array;
}

// 判断当前请求是否需要验证
function _getIfAuthent(currentUrl, eliminates){
    let result = true;

    for(let key of eliminates){
        if(currentUrl === key){
            result = false;
            break;
        }else{
            result = true;
            continue;
        }
    }

    return result;
}

module.exports = function(app){

    /**
     * when destory session
     * router: redriect to 401 page
     * ajax: return 401 status
     * 通过req.xhr判断是否为ajax请求还是路由(true 为ajax)
     */
    app.all('/*', (req, res, next)=>{
        let // url = req.originalUrl,
            url = req.path,
            eliminate = _getEliminate(share.ELIMINATE),
            ifAuthent = _getIfAuthent(url, eliminate);

        if(ifAuthent){
            console.log(`request url: ---> ${url}\n
            current worker.id: --->${cluster.worker.id}\n
            current session.id: ---> ${req.session.id}`);

            handleRequest({app,req, res,next})
        }else{
            switch(url){
                case share.LOGIN_ROUTER:
                    let options = {app, req, res, next};

                    handleLoginRoute(options);
                    break;

                default:
                    next();
                    break;   
            }
        }
    })
}