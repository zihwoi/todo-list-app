 
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');

addTaskBtn.addEventListener('click', function() {
    const taskText = newTaskInput.value.trim();
    if (taskText === '') return;

    const newTask = document.createElement('li');
    newTask.textContent = taskText;
    taskList.appendChild(newTask);

    newTaskInput.value = '';
});
