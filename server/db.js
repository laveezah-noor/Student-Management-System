const sql = require('mysql2');
require('dotenv').config();

const connection = sql.createConnection({
  user: 'user',
  password: 'Allan.3048',
  database: 'ClassroomSystem',
});

module.exports = connection;