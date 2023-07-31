import './style.css';

// Create 'todo list' which contains item title, description, and id add in the input then display on the form table which contains check box included title, description, is done and id

// TypeScript code
const tbody = document.querySelector('tbody');

const titleInput: HTMLInputElement = document.getElementById('title');
const descriptionInput: HTMLInputElement = document.getElementById('description');
const idInput: HTMLInputElement = document.getElementById('id');

const addBtn: HTMLButtonElement = document.getElementById('addBtn');


type TodoItem = {
  title: string;
  description: string;
  isDone: boolean;
  id: number; 
};

const todoList: TodoItem[] = [];

// save todo table
const saveTodo = localStorage.getItem('todoList')
if (saveTodo) {
  todoList.push(...JSON.parse(saveTodo));
  todoTable();
}

addBtn.addEventListener('click', addItem);

// Add item function
function addItem() {
  const title = titleInput.value;
  const description = descriptionInput.value;

  if (title && description) {
    const newItem: TodoItem = {
      isDone: false,
      title,
      description,
      id: generateOrderedId(), // Generate a random ID
    };

    todoList.push(newItem);
    todoTable();

      // Save in localStorage
    localStorage.setItem('todoList', JSON.stringify(todoList));

    // Input fields clear
    titleInput.value = '';
    descriptionInput.value = '';
  }
};

function deleteItem(index: number) {
  todoList.splice(index, 1); // Remove from the todoList
  todoTable(); 
  saveTodoList(); 
}
function saveTodoList() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

// Function to generate random ID
let counter = todoList.length; 
function generateOrderedId(): number {
  return counter++;
}

// Render todo table function
function todoTable() {
  tbody.innerHTML = '';

  todoList.forEach((item, index) => {
    const row = document.createElement('tr');
    const isDoneCell = document.createElement('td');
    const checkbox = document.createElement('input');

    checkbox.type = 'checkbox';
    checkbox.checked = item.isDone;

    checkbox.addEventListener('change', () => {
      todoList[index].isDone = checkbox.checked;

      if (checkbox.checked) {
        row.classList.add('highlighted');
      } else {
        row.classList.remove('highlighted');
      }
    });

    const titleCell = document.createElement('td');
    const descriptionCell = document.createElement('td');
    const idCell = document.createElement('td');

    const deleteCell = document.createElement('td'); // Create a new td element for the delete button

    const deleteButton = document.createElement('text'); 
    deleteButton.textContent = 'Delete';

    deleteButton.addEventListener('click', () => {
      deleteItem(index); 
    });

    isDoneCell.appendChild(checkbox);
    row.appendChild(isDoneCell);

    titleCell.textContent = item.title;
    row.appendChild(titleCell);

    descriptionCell.textContent = item.description;
    row.appendChild(descriptionCell);

    deleteCell.appendChild(deleteButton); 
    row.appendChild(deleteCell); 

    idCell.textContent = item.id.toString();
    row.appendChild(idCell);

    tbody.appendChild(row);
  });
}

