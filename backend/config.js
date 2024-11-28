const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST, // e.g., 'localhost'
  user: process.env.DB_USER, // e.g., 'root'
  password: process.env.DB_PASS, // your MySQL password
  database: process.env.DB_NAME, // the name of your database
  waitForConnections: true,
  connectionLimit: 10, // Maximum number of connections in the pool
  queueLimit: 0, // Unlimited queue length
});

module.exports = pool.promise();
