// Selecting the elements
const toDoForm = document.querySelector('form');
const toDoInput = document.querySelector('#todo-input');
const toDoUl = document.querySelector('.todo-ul');
const addTaskButton = document.querySelector('#add-task-button');
const searchBar = document.querySelector('#search');
const listContainer = document.querySelector('[data-lists]');
const listDisplayContainer = document.querySelector('[data-list-display-container]');
const LOCAL_STORAGE_LIST_ID_KEY = 'task.selectedListId';

let selectedListId = localStorage.getItem(LOCAL_STORAGE_LIST_ID_KEY);

// Selecting the list
listContainer.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'li') {
    selectedListId = e.target.dataset.listId;
    saveAndRender();
  }
});

let lists = [{
  id: 1,
  name: 'Your Day'
}, {
  id: 2,
  name: 'Important'
}, {
  id: 3,
  name: 'Planned'
}, {
  id: 4,
  name: 'All Tasks'
}];

let allToDos = loadTodos();
updateTodoList();

// Rendering the list
function renderList() {
  clearElements(listContainer);

  const listIcons = {
    'Your Day': 'fa-solid fa-sun',
    'Important': 'fa-regular fa-star',
    'Planned': 'fa-regular fa-calendar-alt',
    'All Tasks': 'fa-solid fa-house-user',
  };

  const listStyles = {
    'Your Day': 'color: #74C0FC;',
    'Important': 'color: #925490;',
    'Planned': 'color: #63E6BE;',
    'All Tasks': 'color: #475569;'
  };

  lists.forEach(list => {
    const listElement = document.createElement('li');
    listElement.dataset.listId = list.id;
    listElement.classList.add('list-item', 'hover:cursor-pointer');
    const iconsClass = listIcons[list.name] || 'fa-solid fa-list';
    const listStyle = listStyles[list.name] || '';
    listElement.innerHTML = `<h1 class="text-base font-JetBrainsMono ml-16 my-4"><i class="${iconsClass} mr-4 text-base" style="color: #74C0FC; ${listStyle}"></i>${list.name}</h1>`;
    if (list.id === selectedListId) {
      listElement.classList.add('active-list');
    }
    listContainer.appendChild(listElement);
  });
}

// Clearing the list
function clearElements(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// Making the add task button active
addTaskButton.addEventListener('click', (e) => {
  e.preventDefault();
  addTodo();
});

// Adding the task to the list
function addTodo(){
  const toDos = toDoInput.value.trim();
  if(toDos.length > 0){
    const todoObject = {
      text: toDos,  
      completed: false
    }
    if (!allToDos) {
      allToDos = [];
    }
    allToDos.push(todoObject);
    toDoInput.value = '';
    saveTodos();
    updateTodoList();
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

// Updating the task list
function updateTodoList(){
  toDoUl.innerHTML = '';
  if (allToDos) {
    allToDos.forEach((todos, todoIndex) => {
      const todoLi = createTodo(todos, todoIndex);
      toDoUl.append(todoLi);
    });
  }
}

// Deleting the task
function deleteTodo(todoIndex){
  allToDos.splice(todoIndex, 1);
  saveTodos();
  updateTodoList();
}

// Saving the task
function saveTodos(){
  localStorage.setItem('todos', JSON.stringify(allToDos));
}

// Loading the task
function loadTodos(){
  const todos = localStorage.getItem('todos') || '{}';
  return JSON.parse(todos);
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

// saving to local storage
function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_ID_KEY, selectedListId);
}

// saving and rendering
function saveAndRender() {
  save();
  renderList();
  updateTodoList();
}

searchBar.addEventListener('keyup', searchTask);