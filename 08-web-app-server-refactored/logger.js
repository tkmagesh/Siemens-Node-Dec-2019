var chalk = require('chalk');

function logger(req, res,next){
    var logMessage = chalk.magenta(req.method) + '\t' + chalk.cyan(req.urlObj.pathname.padEnd(20, ' ')) + '\t';
    var startTime = new Date();
    res.on('finish', function(){
        var endTime = new Date(),
            elapsed = endTime - startTime;
        logMessage += chalk.yellowBright(res.statusCode) + '\t' + elapsed + chalk.green('ms');
        console.log(logMessage); 
    });
    next(); 
}

module.exports = logger;