const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
let token = '';  // Store JWT token here

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (data.token) {
    token = data.token;
    fetchTasks();
  }
});

async function fetchTasks() {
  const response = await fetch('/api/todos', {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  const tasks = await response.json();
  list.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${task.task} - ${task.completed ? 'Completed' : 'Pending'}
      <button onclick="toggleCompletion(${task.id})">Toggle Completion</button>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    list.appendChild(li);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const task = input.value;
  const dueDate = new Date().toISOString();  // Set due date to now (for simplicity)

  const response = await fetch('/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ task, dueDate })
  });

  const newTask = await response.json();
  input.value = '';
  fetchTasks();
});
