// Constants
const LOCAL_STORAGE_LIST_KEY = 'task.lists'; 
const LOCAL_STORAGE_LIST_ID_KEY = 'task.selectedListId';

// variables
const toDoForm = document.querySelector('form');
const toDoInput = document.querySelector('#todo-input');
const toDoUl = document.querySelector('.todo-ul');
const addTaskButton = document.querySelector('#add-task-button');
const searchBar = document.querySelector('#search');

// data sets
const listContainer = document.querySelector('.list');
const listDisplayContainer = document.querySelector('[data-list-display-container]');
const listTitleElement = document.querySelector('[data-list-title]');
const taskContainer = document.querySelector('[data-tasks]');

let lists = [
  {name: 'Your Day'},
  {name: 'Important'},
  {name: 'Planned'},
  {name: 'All Tasks'}
];

// creating the list

function renderList() {
  // list icons
  const listIcon = {
    'Your Day': 'fa-solid fa-sun',
    'Important': 'fa-regular fa-star',
    'Planned': 'fa-regular fa-calendar-alt',
    'All Tasks': 'fa-solid fa-house-user',
  };

  // list icons style
  const listStyle = {
    'Your Day': 'color: #74C0FC;',
    'Important': 'color: #925490;',
    'Planned': 'color: #63E6BE;',
    'All Tasks': 'color: #475569;'
  };

  listContainer.innerHTML = ''; // Clear the existing list
  lists.forEach(list => {
    const listElement = document.createElement('li');
    listElement.classList.add('list-item');
    let listIcons = listIcon[list.name]; //Creating a variable to store the list icons inside the list for each list
    let iconStyle = listStyle[list.name]; //Creating a variable to store the list style inside the list for each list
    listElement.innerHTML = `<h1 class="text-base font-JetBrainsMono ml-16 my-4"><i class="${listIcons} mr-4 text-base" style="color: #74C0FC; ${iconStyle}"></i>${list.name}</h1>`;
    listContainer.appendChild(listElement);
  });
};

renderList();