function logger(req, res,next){
    var logMessage = req.method + '\t' + req.urlObj.pathname.padEnd(20, ' ') + '\t';
    var startTime = new Date();
    res.on('finish', function(){
        var endTime = new Date(),
            elapsed = endTime - startTime;
        logMessage += res.statusCode + '\t' + elapsed + 'ms';
        console.log(logMessage); 
    });
    next(); 
}

module.exports = logger;