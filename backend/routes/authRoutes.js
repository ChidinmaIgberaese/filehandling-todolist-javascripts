const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');


// POST route for registration
router.post('/register', (req, res) => {
    // handle registration logic here (e.g., save user to database)
    const { username, email, password } = req.body;
    // validate and process the data
    res.redirect('/login'); // Redirect after successful registration
  });
  
  module.exports = router;

  
router.post('/login', loginUser);

module.exports = router;
