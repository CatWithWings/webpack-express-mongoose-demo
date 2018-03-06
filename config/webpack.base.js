const webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    glob = require('glob'),
    helpers = require('./helpers'),
    webpackPageConfig = require('./webpack.base.page')(HtmlWebpackPlugin);

function entries(){
    var jsDir = helpers.root('src/app'),
        entryFiles = glob.sync(jsDir + '/**/*.main.{js,jsx}'),
        map = {},
        i = 0,
        len = entryFiles.length,
        filePath = "",
        filename = "";
    
    for (i = 0; i < len; i++) {
        filePath = entryFiles[i];
        filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        map[filename] = filePath;
    }

    return map;
}

module.exports = {
    
    entry: Object.assign({

        // 目的是将公用库单独提取打包（例如jquery.js）
        'vendor': ['babel-polyfill', './src/app/app.js'],
        'base' : ['./src/app/base.js']
    },entries()),

    resolve: {
        extensions: ['.js'],
        enforceExtension: false
    },

    externals: {
        jquery: 'jQuery'
    },

    module: {
        rules: [
            {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                },{
                    loader: 'expose-loader',
                    options: '$'
                }]
            },
            {
                test: /\.(htm|html)$/i,
                loader: 'html-withimg-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }, 

            {
                test: /\.jsx?$/,
                exclude: helpers.root('src/static/js'),
                loader: 'babel-loader'
            },

            { // awesome
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                loader: "url-loader",
                options: {
                    limit : 10000,
                    minetype : 'application/font-woff',
                    name : 'fonts/[name].[hash].[ext]'
                } 
            },
            { // awesome
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                loader: "file-loader",
                options: {
                    name : 'fonts/[name].[hash].[ext]'
                } 
            },
            {
                test: /\.(png|jpe?g|gif|ico)$/,
                loader: "url-loader",
                options: {
                    limit : 8192,
                    name : 'img/[name].[hash].[ext]'
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[
                        {loader: "css-loader"}
                    ]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[
                        {loader: "css-loader"}, 
                        {loader: "sass-loader"}
                    ]
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[
                        {loader: "css-loader"}, 
                        {loader: "less-loader"}
                    ]
                })
            }
        ]},

    plugins: [
        // vendor.js包中只包含提供商代码
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/vendor.js',
            minChunks: Infinity
        }),

        ...webpackPageConfig
    ]
};