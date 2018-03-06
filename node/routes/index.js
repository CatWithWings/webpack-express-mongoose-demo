module.exports = function(app) {
    app.get('/', function(req, res) {
        res.redirect('/user/login');
    }).get('/user/login', function(req, res){
        res.render('./user/login')
    }).get('/user/register', function(req, res){
        res.render('./user/register')
    }).get('/monitor/home', function(req, res){
        res.render('./home')
    }).get('/error/404', function(req, res){
        res.render('./404')
    }).get('/error/403', function(req, res){
        res.render('./403')
    }).get('/error/401', function(req, res){
        res.render('./401')
    })
}

