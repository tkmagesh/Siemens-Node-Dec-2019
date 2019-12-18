var express = require('express'),
    createError = require('http-errors'),
    router = express.Router(),
    taskService = require('../servcies/taskService');

router.get('/', function(req, res, next){
    res.json(taskService.getAll());
});

router.get('/:id', function(req, res, next){
    var taskId = parseInt(req.params.id);
    var task = taskService.get(taskId);
    if (task){
        res.json(task);
    } else {
        next();
    }
});

router.post('/', function(req, res, next){
    var taskData = req.body;
    var addedTask = taskService.addNew(taskData);
    res.status(201).json(addedTask);
    
});

router.put('/:id', function(req, res, next){
    var updatedTask = req.body,
        taskId = parseInt(req.params.id);
    taskService.update(taskId, updatedTask);
    res.json(updatedTask);
});

router.delete('/:id', function(req, res, next){
    var taskId = parseInt(req.params.id);
    if (!taskService.get(taskId)){
        next(createError(404));
    } else {
        taskService.remove(taskId);
        res.json(null);
    }
});

module.exports = router;