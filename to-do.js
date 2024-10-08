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
    // Add a class to indicate the selected list
    if (`list-item-${index}` === selectedListId) {
      listElement.classList.add('selected');  // Add a 'selected' class if this is the selected list
    }
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
      'Your Day': 'fa-solid fa-sun',
      'Important': 'fa-regular fa-star',
      'Planned': 'fa-regular fa-calendar-alt',
      'All Tasks': 'fa-solid fa-house-user',
    };
    const listStyle = {
      'Your Day': 'color: #74C0FC;',
      'Important': 'color: #925490;',
      'Planned': 'color: #63E6BE;',
      'All Tasks': 'color: #475569;'
    };
    const iconClass = listIcon[selectedList.name];
    const iconStyle = listStyle[selectedList.name];
    listTitleElement.innerHTML = `<i class="${iconClass}" style="${iconStyle}"></i> ${selectedList.name}`;
  }
};

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_LIST_ID_KEY, selectedListId);
}

function saveAndRender() {
  save();
  render();
}

saveAndRender();