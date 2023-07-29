const express = require('express');
const { createRenter, getRenterById, getRentersByUserId, getAllRenters, updateRenter, deleteRenter } = require('../db/salonRenters');
const salonRentersRouter = express.Router();

// Route to get all renters
salonRentersRouter.get('/', async (req, res, next) => {
    try {
        const renters = await getAllRenters();
        res.send(renters);
    } catch (error) {
        next(error);
    }
});

// Route to get a renter by ID
salonRentersRouter.get('/:id', async (req, res, next) => {
    try {
        const renter = await getRenterById(req.params.id);
        res.send(renter);
    } catch (error) {
        next(error);
    }
});

// Route to get renters by user ID
salonRentersRouter.get('/user/:userId', async (req, res, next) => {
    try {
        const renters = await getRentersByUserId(req.params.userId);
        res.send(renters);
    } catch (error) {
        next(error);
    }
});

// Route to create a new renter
salonRentersRouter.post('/', async (req, res, next) => {
    try {
        const renter = await createRenter(req.body);
        res.send(renter);
    } catch (error) {
        next(error);
    }
});

// Route to update a renter
salonRentersRouter.patch('/:id', async (req, res, next) => {
    try {
        const updatedRenter = await updateRenter({ id: req.params.id, ...req.body });
        res.send(updatedRenter);
    } catch (error) {
        next(error);
    }
});


// Route to delete a renter
salonRentersRouter.delete('/:id', async (req, res, next) => {
    try {
        await deleteRenter(req.params.id);
        res.send({ message: 'Renter deleted' });
    } catch (error) {
        next(error);
    }
});

module.exports = {
    salonRentersRouter
};