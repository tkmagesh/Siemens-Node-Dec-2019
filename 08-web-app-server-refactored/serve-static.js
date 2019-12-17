var path = require('path'),
    fs = require('fs');

var staticResExtns = ['.html', '.png', '.css', '.js', '.jpg', '.ico', '.xml', '.json', '.txt'];
function isStatic(resourceName) {
    return staticResExtns.indexOf(path.extname(resourceName)) >= 0;
}

module.exports = function(req, res, next){
    var resourceName = req.urlObj.pathname === '/' ? '/index.html' : req.urlObj.pathname;
    var resourceFullName = path.join(__dirname, resourceName);
    if (isStatic(resourceName) && fs.existsSync(resourceFullName)) {
        var stream = fs.createReadStream(resourceFullName)
        stream.pipe(res);
        stream.on('end', function(){
            next();
        });   
    } else {
        next();
    }
}