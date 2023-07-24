// 1) Imports 
require('dotenv').config();
const pg = require('pg');

// 2) Now we have to establish a client connection to our DB url
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost:5432/Jamal');

// 3) Export this client connection that we just created
module.exports = { client };