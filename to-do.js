const toDoForm = document.querySelector('form');
const toDoInput = document.querySelector('#todo-input');
const toDoUl = document.querySelector('.todo-ul');

let allToDos = [];

toDoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo(){
  const toDos = toDoInput.value.trim();
  if(toDos.length > 0){
    allToDos.push(toDos);
    toDoInput.value = '';
    console.log(allToDos);
    updateTodoList();
  } else {
    alert('Please enter a task');
  }
}

function createTodo(todos, todoIndex){
  const todoLi = document.createElement('li');
  const todoId = `todo-${todoIndex}`;
  todoLi.className = 'task-li';
  todoLi.innerHTML = `
    <input type="checkbox" id="${todoId}" class="mx-4 mt-3">
    <label class="custom-checkbox transition-all ease-in-out duration-300" for="${todoId}">${todos}</label>
    <button class="delete-task-button ml-[47vw]">
      <i class="fa-solid fa-trash" style="color: #62676f;"></i>
    </button>
  `;
  return todoLi;
}

function updateTodoList(){
  toDoUl.innerHTML = '';
  allToDos.forEach((todos, todoIndex) => {
    const todoLi = createTodo(todos, todoIndex); // {{ edit_1 }}
    toDoUl.append(todoLi);
  })
}