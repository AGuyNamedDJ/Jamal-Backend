// Requires
require('dotenv').config();
const express = require('express');
const morgan = require('morgan'); 
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();

// Import project dirs
const { apiRouter } = require('./api/index');
const { client } = require('./db/index');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

// Catch-all route handler
app.get("/", (req, res) => {
    res.send("Server is Running!")
});

// Router Handelers
app.use('/api', apiRouter)

try {
    client.connect();
} catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to connect to database." });
};

// Port
const PORT = process.env.PORT || 3001
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Now running on port ${PORT}`)
    });
};

// Export
module.exports = {
    app,
    client,
    jwt,
    bcrypt
};