// 1) Imports 
require('dotenv').config();
const pg = require('pg');

// 2) Establish a client/DB connection
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost:5432/Jamal');

// 3) Export 
module.exports = { client };