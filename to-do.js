// Constants
const LOCAL_STORAGE_LIST_KEY = 'task.lists'; 
const LOCAL_STORAGE_LIST_ID_KEY = 'task.selectedListId';

// variables
const toDoForm = document.querySelector('form');
const toDoInput = document.querySelector('#todo-input');
const toDoUl = document.querySelector('.todo-ul');
const addTaskButton = document.querySelector('#add-task-button');
const searchBar = document.querySelector('#search');
const taskForm = document.querySelector('#task-form');
const listInput = document.querySelector('.list-input');
const addListButton = document.querySelector('#add-list-button');
const deleteListButton = document.querySelector('#delete-list-button');
const fontIcon = document.querySelector('#icon-select');

// data sets
const listContainer = document.querySelector('.list');
const listDisplayContainer = document.querySelector('[data-list-display-container]');
const listTitleElement = document.querySelector('[data-list-title]');
const taskContainer = document.querySelector('[data-tasks]');

taskForm.style.display = 'none';

let lists;
try {
  lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [
    {name: 'All Tasks'},
    {name: 'Your Day'},
    {name: 'Important'},
    {name: 'Planned'}
  ];
} catch (error) {
  lists = [
    {name: 'All Tasks'},
    {name: 'Your Day'},
    {name: 'Important'},
    {name: 'Planned'}
  ];
}

addListButton.addEventListener('click', (e) => {
  e.preventDefault();
  addList();
})

deleteListButton.addEventListener('click', (e) => {
  e.preventDefault();
  deleteList();
});

fontIcon.addEventListener('change', function() {
  let selectedIcon = this.value;
  document.getElementById('selected-icon').className = selectedIcon;  // Updates the icon
});

// Adding the list
function addList() {
  const listName = listInput.value.trim();
  const icon = fontIcon.value; // Default icon if none is selected
  if (listName.length > 0) {
    const newList = { id: `list-item-${lists.length}`, name: listName, icon: icon, todos: [] };
    lists.push(newList);
    saveAndRender();
    listInput.value = '';
  } else {
    alert('Please enter a valid list name');
  }
}

function deleteList() {
  if (lists.length > 4) {
    lists.pop();
    saveAndRender();
  } else {
    alert('Cannot delete the default lists');
  }
}


let selectedListId = localStorage.getItem(LOCAL_STORAGE_LIST_ID_KEY);
console.log(selectedListId);

// clearing the default list
function clearElements(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// creating the list

function renderList() {
  // list icons
  const listIcon = {
    'All Tasks': 'fa-solid fa-house-user',
    'Your Day': 'fa-solid fa-sun',
    'Important': 'fa-regular fa-star',
    'Planned': 'fa-regular fa-calendar-alt'
  };

  // list icons style
  const listStyle = {
    'All Tasks': 'color: #475569;',
    'Your Day': 'color: #74C0FC;',
    'Important': 'color: #925490;',
    'Planned': 'color: #63E6BE;'
  };

  lists.forEach((list, index) => {
    const listElement = document.createElement('li');
    listElement.classList.add('list-item', 'hover:cursor-pointer');
    // Add a class to indicate the selected list
    if (`list-item-${index}` === selectedListId) {
      listElement.classList.add('selected');  // Add a 'selected' class if this is the selected list
    }
    let listIcons = list.icon || listIcon[list.name]; //Creating a variable to store the list icons inside the list for each list
    let iconStyle = listStyle[list.name] || 'color: #74C0FC;'; //Creating a variable to store the list style inside the list for each list
    listElement.innerHTML = `<h1 class="text-base font-JetBrainsMono ml-16 my-4"><i class="${listIcons} mr-4 text-base" style="color: #74C0FC; ${iconStyle}"></i>${list.name}</h1>`;
    listElement.id = `list-item-${index}`;
    listContainer.appendChild(listElement);

    // Add a line under the "All Tasks" list item
    if (list.name === 'All Tasks') {
      const hrElement = document.createElement('hr');
      hrElement.style.borderWidth = '1%';
      hrElement.style.borderColor = '#4b5563';
      listContainer.appendChild(hrElement);
    }

    listContainer.style.marginTop = '10vh';
  });
};

// Event listener for the list items
listContainer.addEventListener('click', (e) => {
  const listItem = e.target.closest('li');
  if (listItem) {
    selectedListId = listItem.id;
    saveAndRender();
  }
});

// Add some CSS for visual feedback when a list is selected
const style = document.createElement('style');
style.innerHTML = `
  .selected {
    background-color: #d3d3d3;
    font-weight: bold;
  }

  .task-margin-adjust {
    margin-top: 5vh;
  }
`;
document.head.appendChild(style);

function render() {
  clearElements(listContainer);
  renderList();

  const selectedList = lists.find(list => `list-item-${lists.indexOf(list)}` === selectedListId);
  if (selectedListId === null) {
    listDisplayContainer.style.display = 'none';
  } else {
    listDisplayContainer.style.display = '';
    const listIcon = {
      'All Tasks': 'fa-solid fa-house-user',
      'Your Day': 'fa-solid fa-sun',
      'Important': 'fa-regular fa-star',
      'Planned': 'fa-regular fa-calendar-alt'
    };
    const listStyle = {
      'All Tasks': 'color: #475569;',
      'Your Day': 'color: #74C0FC;',
      'Important': 'color: #925490;',
      'Planned': 'color: #63E6BE;',
    };
    const iconClass = selectedList.icon || listIcon[selectedList.name] || 'fa-solid fa-list';
    const iconStyle = listStyle[selectedList.name] || 'color: #74C0FC;';
    listTitleElement.innerHTML = `<i class="${iconClass}" style="${iconStyle}"></i> ${selectedList.name}`;
  }
};

// let allToDos = {};
loadTodos();
updateTodoList();

// Making the add task button active
addTaskButton.addEventListener('click', (e) => {
  e.preventDefault();
  addTodo();
});

// Adding the task to the list
function addTodo() {
  const toDos = toDoInput.value.trim();  // Get the task text from input
  if (toDos.length > 0) {
    const todoObject = {
      text: toDos,
      completed: false
    };

    // Find the selected list
    const selectedList = lists.find(list => `list-item-${lists.indexOf(list)}` === selectedListId);
    if (selectedList) {
      // Add the new task to the selected list's todos array
      selectedList.todos.push(todoObject);
      
      saveTodos();  // Save the updated tasks for the selected list
      updateTodoList();  // Re-render the task list for the selected list
    }
    toDoInput.value = '';
  } else {
    alert('Please enter a task');
  }
}

// Creating the task list
function createTodo(todos, todoIndex){
  const todoLi = document.createElement('li');
  const todoId = `todo-${todoIndex}`;
  const todoText = todos.text;
  todoLi.className = 'task-li';
  todoLi.innerHTML = `
    <input type="checkbox" id="${todoId}" class="mx-4 mt-3">
    <label class="custom-checkbox transition-all ease-in-out duration-300" for="${todoId}">${todoText}</label>
    <button class="delete-task-button ml-[47vw]">
      <i class="fa-solid fa-trash" style="color: #62676f;"></i>
    </button>
  `;

  const deleteButton = todoLi.querySelector('.delete-task-button');
  deleteButton.addEventListener('click', () => {
    deleteTodo(todoIndex);
  })

  const checkBox = todoLi.querySelector('input');
  checkBox.addEventListener('change', () => {
    todos.completed = checkBox.checked;
    saveTodos();
    updateTodoList();
  })
  checkBox.checked = todos.completed;
  return todoLi;
}

// Creating the task list for "All Tasks"
function createTodoForAllTasks(todos, listName, todoIndex) {
  const todoLi = document.createElement('li');
  const todoId = `todo-${todoIndex}-${listName}`;  // Unique ID based on the task and the list name
  const todoText = todos.text;
  todoLi.className = 'task-li';

  // Define the icons for each list
  const listIcon = {
    'All Tasks': 'fa-solid fa-house-user',
    'Your Day': 'fa-solid fa-sun',
    'Important': 'fa-regular fa-star',
    'Planned': 'fa-regular fa-calendar-alt'
  };

  const listStyle = {
    'All Tasks': 'color: #475569;',
    'Your Day': 'color: #74C0FC;',
    'Important': 'color: #925490;',
    'Planned': 'color: #63E6BE;'
  };

  const iconClass = listIcon[listName];  // Get the icon class for the list
  const style = listStyle[listName];  // Get the icon style for the list

  todoLi.innerHTML = `
    <input type="checkbox" id="${todoId}" class="mx-4 mt-3">
    <label class="custom-checkbox transition-all ease-in-out duration-300" for="${todoId}">
      ${todoText} <i class="${iconClass} text-sm text-gray-500 absolute left-[45vw]" style="${style}"></i>  <!-- Display the list icon -->
    </label>
    <button class="delete-task-button ml-[47vw]">
      <i class="fa-solid fa-trash" style="color: #62676f;"></i>
    </button>
  `;

  // Add event listener for deletion
  const deleteButton = todoLi.querySelector('.delete-task-button');
  deleteButton.addEventListener('click', () => {
    deleteTodoForAllTasks(todoIndex, listName);  // Call deleteTodoForAllTasks when deleting from All Tasks
  });

  // Handle checkbox changes for completed/uncompleted tasks
  const checkBox = todoLi.querySelector('input');
  checkBox.addEventListener('change', () => {
    todos.completed = checkBox.checked;
    saveTodos();  // Save after a task is checked/unchecked
    updateTodoList();  // Re-render the task list
  });
  checkBox.checked = todos.completed;  // Set the checkbox state

  return todoLi;
}

// Updating the task list
function updateTodoList() {
  clearTasks();  // Clear any existing tasks from the UI
  
  const selectedList = lists.find(list => `list-item-${lists.indexOf(list)}` === selectedListId);

  if (selectedList && selectedList.name === 'All Tasks') {
    // If "All Tasks" is selected, gather tasks from all lists
    lists.forEach(list => {
      if (list.name !== 'All Tasks') {  // Skip the "All Tasks" list itself
        list.todos.forEach((todos, todoIndex) => {
          const todoLi = createTodoForAllTasks(todos, list.name, todoIndex);  // Use a new helper function to handle All Tasks
          toDoUl.append(todoLi);  // Add each task to the "All Tasks" list
        });
      }
    });
  } else if (selectedList && selectedList.todos) {
    // For all other lists, render their specific tasks
    selectedList.todos.forEach((todos, todoIndex) => {
      const todoLi = createTodo(todos, todoIndex);  // Create a task element
      toDoUl.append(todoLi);  // Append it to the task list
    });
  }
}

// Deleting the task
function deleteTodo(todoIndex) {
  const selectedList = lists.find(list => `list-item-${lists.indexOf(list)}` === selectedListId);
  selectedList.todos.splice(todoIndex, 1);
  saveTodos();
  updateTodoList();
}

// Deleting the task for "All Tasks"
function deleteTodoForAllTasks(todoIndex, listName) {
  const list = lists.find(list => list.name === listName);  // Find the correct list
  list.todos.splice(todoIndex, 1);  // Remove the task from the specific list's todos
  saveTodos();  // Save the changes
  updateTodoList();  // Re-render the task list
}

// Saving the task
function saveTodos() {
  const selectedList = lists.find(list => `list-item-${lists.indexOf(list)}` === selectedListId);
  if (selectedList) {
    localStorage.setItem(selectedList.name, JSON.stringify(selectedList.todos));  // Save the tasks for the selected list
  }
}

// Loading the task
function loadTodos() {
  lists.forEach(list => {
    list.todos = JSON.parse(localStorage.getItem(list.name)) || [];  // Load the tasks for each list from localStorage
  });
}

// Searching the task
function searchTask() {
  let searchQuery = searchBar.value.trim().toLowerCase();
  let taskLi = document.querySelectorAll('.task-li');

  for (let i = 0; i < taskLi.length; i++) {
    if(!taskLi[i].textContent.toLowerCase().includes(searchQuery)){
      taskLi[i].style.display = 'none';
    } else {
      taskLi[i].style.display = 'block';
    }
  }
}

function clearTasks() {
  toDoUl.innerHTML = '';  // Clears all tasks in the current list display
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_LIST_ID_KEY, selectedListId);
}

function saveAndRender() {
  save();
  render();
  clearTasks();
  updateTodoList();

  const selectedListName = lists.find(list => `list-item-${lists.indexOf(list)}` === selectedListId).name;
  if (selectedListName === 'All Tasks') {
    taskForm.style.display = 'none';
    toDoUl.classList.add('task-margin-adjust');
  } else {
    taskForm.style.display = '';
    toDoUl.classList.remove('task-margin-adjust');
  }
}

saveAndRender();

searchBar.addEventListener('keyup', searchTask);