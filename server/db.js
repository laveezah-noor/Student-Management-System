const sql = require('mysql2');
require('dotenv').config();

const connection = sql.createConnection({
  host: 'localhost',
  user: 'user',
  password: '',
  database: 'ClassroomSystem',
  multipleStatements: true});

module.exports = connection;