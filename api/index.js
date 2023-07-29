// Requires
require("dotenv").config();
const express = require("express");
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const { getUserById } = require("../db/Users");
const JWT_SECRET = process.env.JWT_SECRET

// JWT Middleware
apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
    console.log("Req.header on indexAPI", req.header('Authorization'))

    // No authoriation
    if (!auth) {
        console.log("No auth!")
        next(); // Call next middleware/route handler

        // Authorization, so check for auth header 'Bearer'
    } else if (auth) {
        const token = auth.slice(prefix.length); // Get token from auth header
        console.log("We have Auth", token)

        // Verify JWT token
        try {
            const parsedToken = await jwt.verify(token, JWT_SECRET); // Verifying via jwt secret
            console.log("Parsed Token", parsedToken)
            const id = parsedToken && parsedToken.id // Get id from parsed token
            if (id) { 
                console.log('We have id!')
                req.user = await getUserById(id); // From DB
                console.log("id & req.user", id, req.users)
                next();
            }
        } catch (error) {
            console.log(error);
        }

    // Auth header does not start with 'Bearer '
    } else {
        next({
            name: 'AuthorizationHeaderError',
            message: `Authorization token must start with ${ prefix }`
        });
    }
});

// Handle GET request to '/api'
apiRouter.get("/", (req, res) => {
    res.json({message: 'API is running'});
});

// General error handling
apiRouter.use((error, req, res, next) => {
    console.error(error);
    res.status(500).send({ message: error.message });
});

// Routers
const {appointmentsRouter} = require('./appointments');
const {franchiseLocationsRouter} = require('./franchiseLocations');
const {salonRentersRouter} = require('./salonRenters');
const {salonSuitesRouter} = require('./salonSuites');
const {servicesRouter} = require('./services');
const {usersRouter} = require('./users');
apiRouter.use('/appointments', appointmentsRouter);
apiRouter.use('/locations', franchiseLocationsRouter);
apiRouter.use('/renter', salonRentersRouter);
apiRouter.use('/suites', salonSuitesRouter);
apiRouter.use('/services', servicesRouter);
apiRouter.use('/users', usersRouter);

// Export
module.exports = { apiRouter }