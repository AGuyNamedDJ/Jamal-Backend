// Requires
const express = require('express');
const messagesRouter = express.Router();
const { createMessage, getMessagesByUserId, updateMessage,
    deleteMessage, getAllMessages } = require('../db/messages');

// Logging Middleware
messagesRouter.use((req, res, next) => {
    console.log("A request is being made to /messages");
    next();
});

// Get all messages
messagesRouter.get('/', async (req, res, next) => {
    try {
        const messages = await getAllMessages();
        res.send(messages);
    } catch (error) {
        next(error);
    }
});

// Get messages by user ID
messagesRouter.get('/:userId', async (req, res, next) => {
    try {
        const messages = await getMessagesByUserId(req.params.userId);
        res.send(messages);
    } catch (error) {
        next(error);
    }
});

// Create a new message
messagesRouter.post('/', async (req, res, next) => {
    try {
        const message = await createMessage(req.body);
        res.send(message);
    } catch (error) {
        next(error);
    }
});

// Update a message
messagesRouter.put('/:id', async (req, res, next) => {
    try {
        const updatedMessage = await updateMessage(req.params.id, req.body);
        res.send(updatedMessage);
    } catch (error) {
        next(error);
    }
});

// Delete a message
messagesRouter.delete('/:id', async (req, res, next) => {
    try {
        const deletedMessage = await deleteMessage(req.params.id);
        res.send(deletedMessage);
    } catch (error) {
        next(error);
    }
});

// Exports
module.exports = {
    messagesRouter
};