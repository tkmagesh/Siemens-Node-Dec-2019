var querystring = require('querystring'),
    calculator = require('./calculator');
    
module.exports = function(req, res){
    if (req.urlObj.pathname === '/calculator' && req.method === 'GET') {
        var queryData = querystring.parse(req.urlObj.query);
        var op = queryData.op,
            x = parseInt(queryData.x),
            y = parseInt(queryData.y),
            result = calculator[op](x, y);
        res.write(result.toString());
        res.end();
    } else if (req.urlObj.pathname === '/calculator' && req.method === 'POST') {
        var rawData = '';
        req.on('data', function (chunk) {
            rawData += chunk;
        });
        req.on('end', function () {
            var bodyData = querystring.parse(rawData);
            var op = bodyData.op,
                x = parseInt(bodyData.x),
                y = parseInt(bodyData.y),
                result = calculator[op](x, y);
            res.write(result.toString());
            res.end();
        })
    }
}