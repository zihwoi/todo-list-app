const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');

// Load tasks from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskElement = createTaskElement(task.text, task.id);
        taskList.appendChild(taskElement);
    });
});

// Function to create a new task element
function createTaskElement(taskText, id) {
    const newTask = document.createElement('li');
    newTask.setAttribute('data-id', id);

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    newTask.appendChild(taskSpan);

    // Create a container for the buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('task-buttons');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', function() {
        const updatedText = prompt('Edit your task:', taskSpan.textContent);
        if (updatedText !== null) {
            taskSpan.textContent = updatedText;
            saveTasks();
        }
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function() {
        taskList.removeChild(newTask);
        saveTasks();
    });

    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(deleteBtn);
    newTask.appendChild(buttonContainer);

    return newTask;
}


// Save tasks to local storage
function saveTasks() {
    const tasks = [];
    const taskItems = document.querySelectorAll('li');
    taskItems.forEach(item => {
        tasks.push({
            text: item.querySelector('span').textContent,
            id: item.getAttribute('data-id')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add event listener to the add task button
addTaskBtn.addEventListener('click', function() {
    const taskText = newTaskInput.value.trim();
    if (taskText === '') return;

    const id = Date.now(); // Create a unique ID
    const taskElement = createTaskElement(taskText, id);
    taskList.appendChild(taskElement);
    
    newTaskInput.value = '';
    saveTasks(); // Save tasks to local storage
});
