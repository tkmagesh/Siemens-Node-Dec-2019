var middlewares = [];

function exec(req, res, _middlewares) {
    var first = _middlewares[0],
        remaining = _middlewares.slice(1),
        next = function () {
            exec(req, res, remaining);
        };
    if (typeof first === 'function')
        first(req, res, next);
}

function app(req, res){
    exec(req, res, middlewares);
}

app['use'] = function(middleware){
    middlewares.push(middleware);
};

module.exports = app;