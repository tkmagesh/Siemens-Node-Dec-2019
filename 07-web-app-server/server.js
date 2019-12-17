var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url'),
    querystring = require('querystring'),
    calculator = require('./calculator');

var staticResExtns = ['.html', '.png', '.css', '.js', '.jpg', '.ico', '.xml', '.json', '.txt'];
function isStatic(resourceName){
    return staticResExtns.indexOf(path.extname(resourceName)) >= 0;
}

var server = http.createServer(function connectionHandler(req, res) {
    var urlObj = url.parse(req.url),
        resourceName = urlObj.pathname;
    console.log(req.method + '\t' + resourceName);

    if (isStatic(resourceName)){
        var resourceFullName = path.join(__dirname, resourceName);
        if (!fs.existsSync(resourceFullName)){
            res.statusCode = 404;
            res.end();
            return;
        }
        fs.createReadStream(resourceFullName).pipe(res);
    } else if (urlObj.pathname === '/calculator') {
        var queryData = querystring.parse(urlObj.query);
        var op = queryData.op,
            x = parseInt(queryData.x),
            y = parseInt(queryData.y),
            result = calculator[op](x, y);
        res.write(result.toString());
        res.end();
    } else {
        res.statusCode = 404;
        res.end();
    }
});
server.listen('8080');
server.on('listening', function(){
    console.log('web app server listening on 8080!');
});