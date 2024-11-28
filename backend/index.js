const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const filePath = './tasks.json';
const app = express();
const PORT = 5000;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());
app.use(express.static('frontend/public'));

// Load tasks from tasks.json file
function loadTasks() {
    try {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Error reading tasks.json:', error);
    }
    return [];
}

// Save tasks to tasks.json file
function saveTasks() {
    try {
        fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
    } catch (error) {
        console.error('Error writing tasks.json:', error);
    }
}

let todos = loadTasks();  // Load tasks from the file when the server starts

// Get all tasks
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

// Add a new task
app.post('/api/todos', (req, res) => {
    const { name } = req.body;
    const newTask = { id: Date.now(), name };  // Use Date.now() for a unique task ID
    todos.push(newTask);
    saveTasks();  // Save to file
    res.status(201).json(newTask);
});

// Update a task
app.patch('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const task = todos.find(todo => todo.id === id);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    task.name = name;
    saveTasks();  // Save to file
    res.status(200).json(task);
});

// Delete a task
app.delete('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    saveTasks();  // Save to file
    res.status(200).json({ message: 'Task deleted' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
