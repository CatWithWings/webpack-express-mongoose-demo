const webpackMerge = require('webpack-merge'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    commonConfig = require('./webpack.base.js'),
    helpers = require('./helpers'),
    webpackDevRouter = require('./webpack.dev.router'),
    PORT = require('../ports.conf');

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',

    output: {
        path: helpers.root('dist'),
        publicPath: '/', 
        filename: "js/[name].[chunkhash].js",
        chunkFilename: 'js/[name].[chunkhash:5].chunk.js',
        libraryTarget: "umd"
    },

    plugins: [
        new ExtractTextPlugin({
            filename : 'css/[name].[chunkhash:5].css'
        })
    ],

    devServer: {
        compress: true,
        host : '0.0.0.0',
        port: webpackDevRouter.port,

        // 重启将在浏览器自动打开此链接
        open: 'http://127.0.0.1:'+ 
            webpackDevRouter.port + 
            webpackDevRouter.IndexRoute, 

        proxy: {
            '/**/*':{
                bypass: function(req, res, ops){
                    var url = req.url,
                        routes = webpackDevRouter.routes,
                        errors = webpackDevRouter.errors,
                        len = routes.length,
                        i = 0,
                        regx = null;

                    if (req.headers.accept.indexOf("html") !== -1) {
                        for(i; i<len; i++){
                            regx = new RegExp( routes[i]['regx']);
                            if(regx.test(url)){
                                return routes[i]['render'];
                            }
                        }

                        return errors['404']['render'];
                    }
                }
            },
            '/api':{
                target: "http://localhost:" + PORT.SERVER + '/api',
                pathRewrite: {"^/api" : ""}
            }        
        }
    }
});