var path = require('path'),
    fs = require('fs');

var staticResExtns = ['.html', '.png', '.css', '.js', '.jpg', '.ico', '.xml', '.json', '.txt'];
function isStatic(resourceName) {
    return staticResExtns.indexOf(path.extname(resourceName)) >= 0;
}

module.exports = function(req, res){
    var resourceName = req.urlObj.pathname === '/' ? '/index.html' : req.urlObj.pathname;
    if (isStatic(resourceName)) {
        var resourceFullName = path.join(__dirname, resourceName);
        if (!fs.existsSync(resourceFullName)) {
            res.statusCode = 404;
            res.end();
            return;
        }
        fs.createReadStream(resourceFullName).pipe(res);
    }
}