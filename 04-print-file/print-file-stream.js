var fs = require('fs');

var stream = fs.createReadStream('./sample.txt', { encoding : 'utf8'});

//readable stream events -> open, data, end, close, error

/* 
stream.on('data', function(chunk){
    console.log(chunk);
}); 


stream.on('end', function(){
    console.log('Thats all folks!');
});

stream.on('error', function(){
    console.log('something went wrong');
});
*/

stream.pipe(process.stdout);

var counter = 0;

stream.on('data', function(){
    ++counter;    
})

stream.on('end', function () {
    console.log('Thats all folks!');
    console.log('Read Count = ', counter);
});

stream.on('error', function () {
    console.log('something went wrong');
});