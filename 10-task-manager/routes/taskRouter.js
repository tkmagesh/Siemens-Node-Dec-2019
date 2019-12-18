var express = require('express'),
    createError = require('http-errors'),
    router = express.Router(),
    taskService = require('../servcies/taskService');

router.get('/', async function(req, res, next){
   /*  var p = taskService.getAll();
    p.then(function(taskList){
        res.json(taskList);
    });
    p.catch(function(err){
        next(err);
    }); */

    /* taskService
        .getAll()
        .then (function(taskList){
            res.json(taskList);
        })
        .catch (function(err){
            next(err);
        }); */
    try {
        var taskList = await taskService.getAll();
        res.json(taskList);
    } catch (err){
        next(err);
    }

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