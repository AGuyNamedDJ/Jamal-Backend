// Requires
const express = require('express');
const {
    createUser,
    getAllUsers,
    getUserById,
    getUserByUsername,
    loginUser,
    updateUser } = require('../db/users');

// JWT & DOTENV
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;

// BCRYPT
const bcrypt = require('bcrypt');

// Router Middleware
const usersRouter = express.Router();

// Authenticate Middleware
const authenticateUser = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }

        req.user = user;
        next();
    });
};

// Router Handlers
usersRouter.use((req, res, next) => {
    console.log("A request is being made to /users...");
    next();
});

// Endpoint to getAllUsers
usersRouter.get('/', async (req, res, next) => {
    try {
        const users = await getAllUsers();
        res.send({ users });
    } catch (error) {
        next(error);
    }
});

// Endpoint to register
usersRouter.post('/register', async (req, res, next) => {
    const { username, password, email, full_name, user_role, profile_image, phone_number } = req.body;

    try {
        const _user = await getUserByUsername(username);

        if (_user) {
            res.status(409).send({
                name: "UserExistsError",
                message: "A user by that name already exists",
                status: 409
            });
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

            const { password: hashedPassword, ...secureUser } = newUser;
            const token = jwt.sign(
                {
                    id: secureUser.id,
                    username
                }, JWT_SECRET, {
                    expiresIn: "1w",
                });

            res.status(201).send({
                message: "Thank you for signing up.",
                user: secureUser,
                token
            });
        }
    } catch (error) {
        next(error);
    }
});

// Endpoint to login
usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        next({
            name: "MissingCredentialsError",
            message: "Please supply both a username and password."
        });
    }

    try {
        const user = await loginUser({ username, password });

        if (user) {
            const newToken = jwt.sign({ id: user.id, username }, JWT_SECRET, { expiresIn: "1w" });
            res.send({ message: "You're logged in!", token: newToken, success: true });
        } else {
            next({ 
                name: 'IncorrectCredentialsError', 
                message: 'Username &/or password is incorrect!'
            });
        }
    } catch (error) {
        next(error);
    }
});

// Endpoint to getUserByUsername
usersRouter.get('/profile/:username', async (req, res, next) => {
    const { username } = req.params;
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

// Endpoint to authenticateUser
usersRouter.put('/update/:username', authenticateUser, async (req, res, next) => {
    const { password, email, full_name, user_role, profile_image, phone_number } = req.body;
    const { username } = req.params; 

    try {
        const user = await getUserByUsername(username); 

        if (!user) {
            res.status(404).send({
                name: "UserNotFoundError",
                message: "Could not find user with provided username"
            });
        } else {
            const updatedUser = await updateUser(username, {
                password,
                email,
                full_name,
                user_role,
                profile_image,
                phone_number
            });

            const { password: hashedPassword, ...secureUpdatedUser } = updatedUser;

            res.status(200).send({
                message: "User updated successfully.",
                user: secureUpdatedUser
            });
        }
    } catch (error) {
        next(error);
    }
});

// Exports
module.exports = {
    usersRouter
};