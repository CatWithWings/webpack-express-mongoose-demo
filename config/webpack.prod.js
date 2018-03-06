const webpack = require('webpack'),
    webpackMerge = require('webpack-merge'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    commonConfig = require('./webpack.base.js'),
    helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',

    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: "js/[name].[chunkhash].js",
        chunkFilename: 'js/[name].[chunkhash:5].chunk.js',
        libraryTarget: "umd"
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        }),
      
        new ExtractTextPlugin('css/[name].[chunkhash:5].css'),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
});