function webpackPageConfig(HtmlWebpackPlugin){
    return [
        new HtmlWebpackPlugin({
            title: '首页',
            filename: './views/home.html', 
            template: 'src/app/home/home.html',
            chunks: ['vendor', 'base', 'home.main'],
            chunksSortMode: 'manual'
        }),

        new HtmlWebpackPlugin({
            title: '登录',
            filename: './views/user/login.html', 
            template: 'src/app/user/login.html',
            chunks:['vendor', 'login.main'],
            chunksSortMode: 'manual'
        }),

        new HtmlWebpackPlugin({
            title: '注册',
            filename: './views/user/register.html', 
            template: 'src/app/user/register.html',
            chunks:['vendor', 'register.main'],
            chunksSortMode: 'manual'
        }),
    
        new HtmlWebpackPlugin({
            title: '404',
            filename: './views/404.html', 
            template: 'src/app/errors/404.html',
            chunks:['vendor', 'base'],
            chunksSortMode: 'manual'
        }),

        new HtmlWebpackPlugin({
            title: '403',
            filename: './views/403.html', 
            template: 'src/app/errors/403.html',
            chunks:['vendor', 'base', '403.main'],
            chunksSortMode: 'manual'
        }),

        new HtmlWebpackPlugin({
            title: '401',
            filename: './views/401.html', 
            template: 'src/app/errors/401.html',
            chunks:['vendor', '401.main'],
            chunksSortMode: 'manual'
        })
    ];
}

module.exports = webpackPageConfig;