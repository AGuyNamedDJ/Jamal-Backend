// Requires
const express = require('express');
const {
    createUser,
    getAllUsers,
    getUserById,
    getUserByUsername,
    loginUser } = require('../db/users');

// JWT & DOTENV
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;

// BCRYPT
const bcrypt = require('bcrypt');

// Router Middleware
const usersRouter = express.Router();

// Router Handlers
    // Initial usersRouter
    usersRouter.use((req,res,next) => {
        console.log("A request is being made to /users...");
        next();
    });

    // getAllUsers
    usersRouter.get('/', async (req, res, next) => {
        try {
            const users = await getAllUsers();
            res.send({users});
        } catch(error) {
            next(error);
        }
    });

    // Register
    usersRouter.post('/register', async (req, res, next) => {
        const { username, password, email, full_name, user_role, profile_image, phone_number } = req.body;

        try {
            const _user = await getUserByUsername(username);

            // Existing User
            if (_user) {
                res.status(409).send({
                    name: "UserExistsError",
                    message: "A user by that name already exists",
                    status: 409
                });

            // New User
            } else { 
                const newUser = await createUser({
                    username,
                    password,
                    email,
                    full_name,
                    user_role,
                    profile_image,
                    phone_number
                });

                // Create JWT
                const token = jwt.sign(
                    {
                        id: newUser.id,
                        username
                    }, JWT_SECRET, {
                        expiresIn: "1w",
                    });

                res.status(201).send({
                    message: "Thank you for signing up.",
                    newUser,
                    token
                });
            }
        } catch (error) {
            next(error);
        }
    });

    // Login
    usersRouter.post('/login', async (req, res, next) => {
        const { username, password } = req.body;

        // Invalid username/password
        if (!username || !password) {
            next({
                name: "MissingCredentialsError",
                message: "Please supply both a username and password."
            });
        }

        try {
            const user = await loginUser({ username, password });

            // Verified user
            if (user) {
                // Create Token & print
                const newToken = jwt.sign({ id: user.id, username }, JWT_SECRET, { expiresIn: "1w" });
                res.send({ message: "You're logged in!", token: newToken, success: true });

            // Unverified user
            } else {
                next({ 
                    name: 'IncorrectCredentialsError', 
                    message: 'Username &/or password is incorrect!'
                });
            }
        } catch(error) {
            next(error);
        }
    });

    // Profile
    usersRouter.get('/profile', async (req, res, next) => {
        const { username } = req.body;
        try {
            const myUserInfo = await getUserByUsername(username);
            if (myUserInfo) {
                res.send({ myUserInfo });
            } else {
                next({
                    name: 'UserNotFoundError',
                    message: 'Could not find user with provided username'
                });
            }
        } catch (error) {
            next(error);
        }
    });

module.exports = {
    usersRouter
};
