var express = require('express'),
    createError = require('http-errors'),
    router = express.Router();

var taskList = [
    { id : 1, name : 'Explore Bangalore', isCompleted : false},
    { id: 2, name: 'Learn JavaScript', isCompleted: true },
    { id: 3, name: 'Master Node.js', isCompleted: false }
];

router.get('/', function(req, res, next){
    res.json(taskList);
});

router.get('/:id', function(req, res, next){
    var taskId = parseInt(req.params.id),
        task = taskList.find(function(t){
            return t.id === taskId;
        });
    if (task){
        res.json(task);
    } else {
        next();
    }
});

router.post('/', function(req, res, next){
    var taskData = req.body;
    taskData.id = taskList.reduce(function(result, task){
        return result > task.id ? result : task.id;
    }, 0) + 1;
    taskList.push(taskData);
    res.status(201).json(taskData);
    
});

module.exports = router;