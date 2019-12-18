var taskList = [
    { id: 1, name: 'Explore Bangalore', isCompleted: false },
    { id: 2, name: 'Learn JavaScript', isCompleted: true },
    { id: 3, name: 'Master Node.js', isCompleted: false }
];

function getAll(){
    return taskList;
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