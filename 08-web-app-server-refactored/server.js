var http = require('http');

var dataParser = require('./data-parser'),
    serveStatic = require('./serve-static'),
    serveCalculator = require('./serve-calculator'),
    notFoundHandler = require('./notFoundHandler');
    
var server = http.createServer(function connectionHandler(req, res) {
    dataParser(req);
    console.log(req.method + '\t' + req.urlObj.pathname);
    serveStatic(req, res);
    serveCalculator(req, res);
    notFoundHandler(res);
});
server.listen('8080');
server.on('listening', function(){
    console.log('web app server listening on 8080!');
});