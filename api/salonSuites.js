// Requires
const express = require('express');
const salonSuitesRouter = express.Router();
const {
    createSuite,
    getSuiteById,
    getAllSuites,
    updateSuite,
    deleteSuite
} = require('../db/salonSuites');

// Route to get all suites
salonSuitesRouter.get('/', async (req, res, next) => {
    try {
        const suites = await getAllSuites();
        res.send(suites);
    } catch (error) {
        next(error);
    }
});

// Route to get a suite by id
salonSuitesRouter.get('/:id', async (req, res, next) => {
    try {
        const suite = await getSuiteById(req.params.id);
        if (suite) {
            res.send(suite);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        next(error);
    }
});

// Route to create a new suite
salonSuitesRouter.post('/', async (req, res, next) => {
    try {
        const suite = await createSuite(req.body);
        res.send(suite);
    } catch (error) {
        next(error);
    }
});

// Route to update a suite
salonSuitesRouter.patch('/:id', async (req, res, next) => {
    try {
        const updatedSuite = await updateSuite({
            id: req.params.id,
            ...req.body
        });

        if (updatedSuite) {
            res.send(updatedSuite);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        next(error);
    }
});

// Route to delete a suite
salonSuitesRouter.delete('/:id', async (req, res, next) => {
    try {
        await deleteSuite(req.params.id);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

module.exports = {
    salonSuitesRouter
};