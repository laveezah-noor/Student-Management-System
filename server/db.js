const sql = require('mysql2');
require('dotenv').config();

const connection = sql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'Allan.3048',
  database: 'ClassroomSystem',
  multipleStatements: true});

module.exports = connection;