const pool = require('../config');

// Get all todos for a user
exports.getTodos = async (req, res) => {
  try {
    const [todos] = await pool.execute('SELECT * FROM Todos WHERE userId = ?', [req.userId]);
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new todo
exports.addTodo = async (req, res) => {
  const { task, dueDate } = req.body;
  try {
    const [todo] = await pool.execute(
      'INSERT INTO Todos (task, completed, dueDate, userId) VALUES (?, ?, ?, ?)',
      [task, false, dueDate, req.userId]
    );
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Toggle task completion
exports.toggleCompletion = async (req, res) => {
  const { id } = req.params;
  try {
    const [todo] = await pool.execute('SELECT * FROM Todos WHERE id = ?', [id]);
    if (!todo) return res.status(404).json({ message: 'Task not found' });

    const completed = !todo.completed;
    await pool.execute('UPDATE Todos SET completed = ? WHERE id = ?', [completed, id]);
    res.status(200).json({ completed });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a task
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.execute('DELETE FROM Todos WHERE id = ?', [id]);
    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
