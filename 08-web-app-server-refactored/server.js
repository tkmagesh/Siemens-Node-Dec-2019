var http = require('http');

var dataParser = require('./data-parser'),
    serveStatic = require('./serve-static'),
    serveCalculator = require('./serve-calculator'),
    notFoundHandler = require('./notFoundHandler'),
    logger = require('./logger'),
    app = require('./app');

app.use(dataParser);
app.use(logger);
app.use(serveStatic);
app.use(serveCalculator);
app.use(notFoundHandler);

var server = http.createServer(app);

server.listen('8080');
server.on('listening', function(){
    console.log('web app server listening on 8080!');
});