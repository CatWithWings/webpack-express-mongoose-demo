const helpers = require('./helpers'),
    webpack = require('webpack');

module.exports={

    resolve: {
        extensions: ['.js'],
        enforceExtension: false
    },
    
    module:{
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [
                    helpers.root('src/static/js')
                ],
                loader: 'babel-loader'
            },
        ]
    }
};