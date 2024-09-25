const toDoForm = document.querySelector('form');
const toDoInput = document.querySelector('#todo-input');
const toDoUl = document.querySelector('.todo-ul');
const addTaskButton = document.querySelector('#add-task-button');
const searchBar = document.querySelector('#search');

let allToDos = loadTodos();
updateTodoList();

addTaskButton.addEventListener('click', (e) => {
  e.preventDefault();
  addTodo();
});

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

function updateTodoList(){
  toDoUl.innerHTML = '';
  allToDos.forEach((todos, todoIndex) => {
    const todoLi = createTodo(todos, todoIndex);
    toDoUl.append(todoLi);
  })
  }

function deleteTodo(todoIndex){
  allToDos.splice(todoIndex, 1);
  saveTodos();
  updateTodoList();
}

function saveTodos(){
  localStorage.setItem('todos', JSON.stringify(allToDos));
}

function loadTodos(){
  const todos = localStorage.getItem('todos') || '[]';
  return JSON.parse(todos);
}

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
