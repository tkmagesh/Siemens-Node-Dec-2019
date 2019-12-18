var taskDb = require('./taskDb');
var taskList = [];

/* function getAll(callback){
    taskDb.getData(function (err, taskList){
        callback(err, taskList);
    });
    
} */

function getAll() {
    return taskDb.getData()
}

function get(taskId){
    return taskList.find(function (t) {
        return t.id === taskId;
    });
}

function addNew(taskData){
    taskData.id = taskList.reduce(function (result, task) {
        return result > task.id ? result : task.id;
    }, 0) + 1;
    taskList.push(taskData);
    return taskData;
}

function update(taskId, taskData){
    taskList = taskList.map(function (task) {
        if (task.id === taskId) {
            return taskData;
        } else {
            return task;
        }
    });
}

function remove(taskId){
    taskList = taskList.filter(function (task) {
        return task.id !== taskId;
    });
}

module.exports = { getAll, get, addNew, update, remove };