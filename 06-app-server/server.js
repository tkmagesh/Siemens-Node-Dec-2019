var http = require('http'),
    url = require('url'),
    querystring = require('querystring'),
    calculator = require('./calculator');

var server = http.createServer(function handler(req, res) {
    var urlObj = url.parse(req.url),
        queryData = querystring.parse(urlObj.query);
    if (urlObj.pathname !== '/calculator'){
        res.statusCode = 404;
        res.end();
        return;
    }
    var op = queryData.op,
        x = parseInt(queryData.x),
        y = parseInt(queryData.y),
        result = calculator[op](x,y);
    res.write(result.toString());
    res.end();
});

server.listen(9090);
server.on('listening', function(){
    console.log('app server listening on 9090!');
});