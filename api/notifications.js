// Requires
const express = require('express');
const notificationsRouter = express.Router();
const { createNotification, getAllNotifications, getNotificationById,
    updateNotification, deleteNotification } = require('../db/notifications');

// Route to Get All Notifications
notificationsRouter.get('/', async (req, res, next) => {
    try {
        const notifications = await getAllNotifications();
        res.send(notifications);
    } catch (error) {
        next(error);
    }
});

// Route to Get a Specific Notification by ID
notificationsRouter.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const notification = await getNotificationById(id);
        if (notification) {
            res.send(notification);
        } else {
            res.status(404).send({
                message: 'Notification not found.'
            });
        }
    } catch (error) {
        next(error);
    }
});

// Route to Create a New Notification
notificationsRouter.post('/', async (req, res, next) => {
    try {
        const notification = await createNotification(req.body);
        res.send(notification);
    } catch (error) {
        next(error);
    }
});

// Route to Update a Notification
notificationsRouter.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedNotification = await updateNotification(id, req.body);
        if (updatedNotification) {
            res.send(updatedNotification);
        } else {
            res.status(404).send({
                message: 'Notification not found.'
            });
        }
    } catch (error) {
        next(error);
    }
});

// Route to Delete a Notification
notificationsRouter.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedNotification = await deleteNotification(id);
        if (deletedNotification) {
            res.send(deletedNotification);
        } else {
            res.status(404).send({
                message: 'Notification not found.'
            });
        }
    } catch (error) {
        next(error);
    }
});

// Exports
module.exports = {
    notificationsRouter
};