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

let lists;
try {
  lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [
    {name: 'Your Day'},
    {name: 'Important'},
    {name: 'Planned'},
    {name: 'All Tasks'}
  ];
} catch (error) {
  lists = [
    {name: 'Your Day'},
    {name: 'Important'},
    {name: 'Planned'},
    {name: 'All Tasks'}
  ];
}

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

  lists.forEach((list, index) => {
    const listElement = document.createElement('li');
    listElement.classList.add('list-item', 'hover:cursor-pointer');
    let listIcons = listIcon[list.name]; //Creating a variable to store the list icons inside the list for each list
    let iconStyle = listStyle[list.name]; //Creating a variable to store the list style inside the list for each list
    listElement.innerHTML = `<h1 class="text-base font-JetBrainsMono ml-16 my-4"><i class="${listIcons} mr-4 text-base" style="color: #74C0FC; ${iconStyle}"></i>${list.name}</h1>`;
    listElement.id = `list-item-${index}`
    listContainer.appendChild(listElement);
  });
};

// Event listener for the list items
listContainer.addEventListener('click', (e) => {
  const listItem = e.target.closest('li');
  if (listItem) {
    selectedListId = listItem.id
    saveAndRender();
  }
});

function render() {
  clearElements(listContainer);
  renderList();
};

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
}

function saveAndRender() {
  save();
  render();
}

saveAndRender();