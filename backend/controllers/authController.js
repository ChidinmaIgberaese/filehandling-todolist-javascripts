const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config');

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Check if user already exists
  const [existingUser] = await pool.execute('SELECT * FROM Users WHERE email = ?', [email]);
  if (existingUser.length) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const [result] = await pool.execute(
      'INSERT INTO Users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.execute('SELECT * FROM Users WHERE email = ?', [email]);
    const user = rows[0];
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
