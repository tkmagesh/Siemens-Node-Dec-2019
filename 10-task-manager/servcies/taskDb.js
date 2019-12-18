var fs = require('fs'),
    dbFileName = require('path').join(__dirname, '../db/taskData.json');

/* function getData(callback){
     fs.readFile(dbFileName, { encoding: 'utf8'}, function(err, fileContents){
        if (err){
            setImmediate(function(){
                callback(err);
            });
        }
        var data = JSON.parse(fileContents);
        return callback(null, data);
    }) 
} */

function getData() {
    var p = new Promise(function(resolveFn, rejectFn){
        fs.readFile(dbFileName, { encoding: 'utf8' }, function (err, fileContents) {
            if (err) {
                return rejectFn(err);
            }
            var data = JSON.parse(fileContents);
            return resolveFn(data);
        });
    });
    return p;
}

function saveData(data){
    return new Promise(function(resolveFn, rejectFn){
        fs.writeFileSync(dbFileName, JSON.stringify(data), function(err){
            if (err){
                return rejectFn(err);
            }
            resolveFn();
        });
    });
}

module.exports = { getData, saveData };