let cluster = require('cluster');
    numCPUs = require('os').cpus().length,
    stringRandom = require('string-random'),
    app = require('./app');

if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) { // Fork workers.
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
}else {
    const JWTSECRET = 'lQFQ189Uy9CJ2FE3ASgkC3k5p8BW0EcC';
    const SESSIONSECRET = 'px0Tmj7gYDGe3yPY0WKSxnURolNhDPFs';
    
    app({JWTSECRET, SESSIONSECRET})
}

// app({JWTSECRET, SESSIONSECRET});