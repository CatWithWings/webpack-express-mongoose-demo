const PORT = require('../ports.conf');

const Router = {
    port: PORT.DEVELOP,
    IndexRoute: '/user/login',
    routes:[
        {
            url: '/user/login',
            regx: /^\/user\/login$/,
            render: '/views/user/login.html'
        },
        {
            url: '/user/register',
            regx: /^\/user\/register$/,
            render: '/views/user/register.html'
        },
        {
            url: '/monitor/home',
            regx: /^\/monitor\/home$/,
            render: '/views/home.html'
        },
        {
            url: '/error/403',
            regx: /^\/error\/403$/,
            render: '/views/403.html'
        },
        {
            url: '/error/404',
            regx: /^\/error\/404$/,
            render: '/views/404.html'
        },{
            url: '/error/401',
            regx: /^\/error\/401.*$/,
            render: '/views/401.html'
        }
    ],
    errors:{
        '404': {
            url: '/error/404',
            regx: /^\/error\/404$/,
            render: '/views/404.html'
        }
    }
}

module.exports = Router;