function addSync(x,y){
    console.log('   [@Service] processing ', x, ' and ', y);
    var result = x + y;
    console.log('   [@Service] returning the result');
    return result;
}

function addSyncClient(x,y){
    console.log('[@Client] triggering the service');
    var result = addSync(x,y);
    console.log('[@Client] result = ', result);
}

function add(x,y){
    console.log('[@Service] processing ', x , ' and ', y);
    var p = new Promise(function(resolveFn, rejectFn){
        setTimeout(function () {
            var result = x + y;
            console.log('[@Service] returning the result');
            resolveFn(result);
        }, 4000);
    });
    return p;
}

/* function addClient(x, y) {
    console.log('[@Client] triggering the service');
    var p = add(x, y);
    p.then(function(result){
        console.log('[@Client] result = ', result);
    });
} */

async function addClient(x, y) {
    console.log('[@Client] triggering the service');
    var result = await add(x, y);
    console.log('[@Client] result = ', result);
}