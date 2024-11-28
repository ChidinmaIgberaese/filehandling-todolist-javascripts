const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',  // your MySQL username
  password: 'yourpassword',  // your MySQL password
  database: 'todoApp'
});

module.exports = pool.promise();
