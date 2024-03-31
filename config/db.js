
// config/db.js
const mysql = require('mysql');

const pool = mysql.createPool({
  user: "root",
  host: "127.0.0.1",
  database: "vehicle-classification-database",
  password: "",
  port: 8889, // MySQL default port
});

module.exports = pool;
