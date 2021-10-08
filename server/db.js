const sql = require('mysql2');
require('dotenv').config();

const connection = sql.createConnection({
  // host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'classroomsystem',
  multipleStatements: true});

module.exports = connection;