const sql = require('mysql2');
require('dotenv').config();

const connection = sql.createConnection({
  // host: 'localhost',
  user: 'root',
  password: 'Allan.3048',
  database: 'classroomsystem',
  multipleStatements: true});

module.exports = connection;