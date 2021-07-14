const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.list-group');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');

loadAllEventListeners();

// Load All Event Listeners
function loadAllEventListeners() {
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);

    // Add task
    form.addEventListener('submit', addTask);

    // Remove task item
    taskList.addEventListener('click', removeTask);

    // Filter task
    filter.addEventListener('keyup', filterTasks);   

    // Clear task
    clearBtn.addEventListener('click', clearTasks);
}

// Get task from LS
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        // Create li elements
        const li = document.createElement('li');

        // Add class name
        li.className = 'list-group-item d-flex justify-content-between'; // eikhane (d-flex justify-content-between) class gulo niyechi jate delete icon gulo right side a jay

        // Create text node
        li.appendChild(document.createTextNode(task));

        // Create link elementi
        const link = document.createElement('a');

        // Create link class
        link.className = 'delete-item';

        // Set attribute
        link.setAttribute('href', '#');

        // Set innerHtml
        link.innerHTML = '<i class="fas fa-trash-alt"></i>';

        // Append link to li
        li.appendChild(link);

        // Append li into ul
        taskList.appendChild(li);
    });
}

function addTask(e) {
    e.preventDefault();

    if (taskInput.value === '') {
        alert('Add a task');
    } else {
        // Create li elements
        const li = document.createElement('li');

        // Add class name
        li.className = 'list-group-item d-flex justify-content-between'; // eikhane (d-flex justify-content-between) class gulo niyechi jate delete icon gulo right side a jay...

        // Create text node
        li.appendChild(document.createTextNode(taskInput.value));

        // Create link elementi
        const link = document.createElement('a');

        // Create link class
        link.className = 'delete-item';

        // Set attribute
        link.setAttribute('href', '#');

        // Set innerHtml
        link.innerHTML = '<i class="fas fa-trash-alt"></i>';

        // Append link to li
        li.appendChild(link);

        // Append li into ul
        taskList.appendChild(li);

        storeTaskInLocalStorage(taskInput.value);

        // Clear input field
        taskInput.value = '';
    }
}

// Store task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();

        // Remove from LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks
function clearTasks() {
    // taskList.innerHTML = ''

    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFormLocalStorage();
}

function clearTasksFormLocalStorage() {
    localStorage.clear();
}

// Filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    console.log(text)
    const filterItems = document.querySelectorAll('.list-group-item');

    filterItems.forEach(function(task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            // task.style.display = 'block';
            task.style.setProperty('display', 'flex', 'important');
            
        } else {
            // task.style.display = 'none';
            task.style.setProperty('display', 'none', 'important');            
        }
    });

    // console.log(document.querySelectorAll('.list-group-item'));
}
