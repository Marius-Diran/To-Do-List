// Selecting the elements
const toDoForm = document.querySelector('form');
const toDoInput = document.querySelector('#todo-input');
const toDoUl = document.querySelector('.todo-ul');
const addTaskButton = document.querySelector('#add-task-button');
const searchBar = document.querySelector('#search');

const lists = ['my-day', 'important', 'planned', 'all-tasks'];
let currentList = 'my-day';

let allToDos = loadTodos();
updateTodoList();

// Setting up event listeners
lists.forEach(listId => {
  const listItem = document.querySelector(`[data-list-id="${listId}"]`);
  listItem.addEventListener('click', () => switchList(listId));
});

// toDoForms.forEach((form, index) => {
//   form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     addTodo(toDoInputs[index].value);
//   });
// });

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
  allToDos.forEach((todos, todoIndex) => {
    const todoLi = createTodo(todos, todoIndex);
    toDoUl.append(todoLi);
  })
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
  const todos = localStorage.getItem('todos') || '[]';
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

searchBar.addEventListener('keyup', searchTask);


// // Selecting the elements
// const toDoForms = document.querySelectorAll('form');
// const toDoInputs = document.querySelectorAll('#todo-input');
// const toDoUls = document.querySelectorAll('.todo-ul');
// const addTaskButtons = document.querySelectorAll('#add-task-button');
// const searchBar = document.querySelector('#search');

// const lists = ['my-day', 'important', 'planned', 'all-tasks'];
// let currentList = 'my-day';
// let allToDos = loadTodos();

// updateTodoList();

// // Setting up event listeners
// lists.forEach(listId => {
//   const listItem = document.querySelector(`[data-list-id="${listId}"]`);
//   listItem.addEventListener('click', () => switchList(listId));
// });

// toDoForms.forEach((form, index) => {
//   form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     addTodo(toDoInputs[index].value);
//   });
// });

// searchBar.addEventListener('keyup', searchTask);

// // Switching between lists
// function switchList(listId) {
//   document.querySelectorAll('.main-panel').forEach(panel => panel.classList.add('hidden'));
//   document.getElementById(listId).classList.remove('hidden');
//   currentList = listId;
//   updateTodoList();
// }

// // Adding the task to the list
// function addTodo(todoText) {
//   const toDos = todoText.trim();
//   if (toDos.length > 0) {
//     const todoObject = {
//       text: toDos,
//       completed: false
//     }
//     if (!allToDos[currentList]) {
//       allToDos[currentList] = [];
//     }
//     allToDos[currentList].push(todoObject);
//     toDoInputs.forEach(input => input.value = '');
//     saveTodos();
//     updateTodoList();
//   } else {
//     alert('Please enter a task');
//   }
// }

// // Creating the task list
// function createTodo(todos, todoIndex) {
//   const todoLi = document.createElement('li');
//   const todoId = `${currentList}-todo-${todoIndex}`;
//   const todoText = todos.text;
//   todoLi.className = 'task-li';
//   todoLi.innerHTML = `
//     <input type="checkbox" id="${todoId}" class="mx-4 mt-3">
//     <label class="custom-checkbox transition-all ease-in-out duration-300" for="${todoId}">${todoText}</label>
//     <button class="delete-task-button ml-[47vw]">
//       <i class="fa-solid fa-trash" style="color: #62676f;"></i>
//     </button>
//   `;

//   const deleteButton = todoLi.querySelector('.delete-task-button');
//   deleteButton.addEventListener('click', () => {
//     deleteTodo(todoIndex);
//   })

//   const checkBox = todoLi.querySelector('input');
//   checkBox.addEventListener('change', () => {
//     todos.completed = checkBox.checked;
//     saveTodos();
//     updateTodoList();
//   })
//   checkBox.checked = todos.completed;
//   return todoLi;
// }

// // Updating the task list
// function updateTodoList() {
//   const currentToDoUl = document.querySelector(`#${currentList} .todo-ul`);
//   currentToDoUl.innerHTML = '';
//   if (allToDos[currentList]) {
//     allToDos[currentList].forEach((todos, todoIndex) => {
//       const todoLi = createTodo(todos, todoIndex);
//       currentToDoUl.append(todoLi);
//     });
//   }
// }

// // Deleting the task
// function deleteTodo(todoIndex) {
//   allToDos[currentList].splice(todoIndex, 1);
//   saveTodos();
//   updateTodoList();
// }

// // Saving the task
// function saveTodos() {
//   localStorage.setItem('todos', JSON.stringify(allToDos));
// }

// // Loading the task
// function loadTodos() {
//   const todos = localStorage.getItem('todos') || '{}';
//   return JSON.parse(todos);
// }

// // Searching the task
// function searchTask() {
//   let searchQuery = searchBar.value.trim().toLowerCase();
//   lists.forEach(listId => {
//     let taskLi = document.querySelectorAll(`#${listId} .task-li`);
//     taskLi.forEach(item => {
//       if (!item.textContent.toLowerCase().includes(searchQuery)) {
//         item.style.display = 'none';
//       } else {
//         item.style.display = 'block';
//       }
//     });
//   });
// }