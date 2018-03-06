module.exports = function (SECRET) {
    let express = require('express'),
        mongoose = require('mongoose'),
        handlebars = require('express3-handlebars'),
        cookieParser = require('cookie-parser'),
        bodyParser = require('body-parser'),
        authentication = require('./node/controller/authentication/authentication'),
        routes = require('./node/routes'),
        controller = require('./node/controller/app'),
        app = express(),
        session = require('express-session'),
        MongoStore = require('connect-mongo')(session),
        // FileStore = require('session-file-store')(session),
        sessionOption = require('./node/config/session'),
        http = require('http').Server(app),
        isDev = process.env.NODE_ENV !== 'production',
        portsConf = require('./ports.conf'),
        port = portsConf.SERVER,
        db = null;

    mongoose.connect(portsConf.MONGODB);
    db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {});

    app.set('port', process.env.PORT || port);
    app.set('jwtTokenSecret', SECRET.JWTSECRET);
    app.set('trust proxy', 1)
    app.use(bodyParser());
    app.use(cookieParser());
    app.use(session(Object.assign({}, {
            secret: SECRET.SESSIONSECRET,
            store: new MongoStore({ mongooseConnection: db, stringify: false})
            // store: new FileStore({
            //     path: __dirname + '/node/sessions'
            // })
        },
        sessionOption
    )));

    if (isDev) { // develop
        controller(app, http);
    } else { // product
        app.set('views', __dirname + '/dist/views/');
        app.set('view engine', 'html');
        app.engine('html', handlebars({
            extname: '.html'
        }));
        app.use(express.static(__dirname + '/dist'));
        authentication(app);
        routes(app);
        controller(app, http);

        // 404
        app.get('*', function (req, res) {
            res.redirect('/error/404');
        });
    }
  
    http.listen(app.get('port'), function () {
        console.log('Express started on http://localhost:' + app.get('port'))
    });
}