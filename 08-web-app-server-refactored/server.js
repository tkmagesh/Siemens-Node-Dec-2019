var http = require('http');

var dataParser = require('./data-parser'),
    serveStatic = require('./serve-static'),
    serveCalculator = require('./serve-calculator'),
    notFoundHandler = require('./notFoundHandler'),
    app = require('./app');

app.use(dataParser);
app.use(serveStatic);
app.use(serveCalculator);
app.use(notFoundHandler);

//console.log(req.method + '\t' + req.urlObj.pathname);

var server = http.createServer(app);

server.listen('8080');
server.on('listening', function(){
    console.log('web app server listening on 8080!');
});