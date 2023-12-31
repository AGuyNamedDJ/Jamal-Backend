// Requires
const express = require('express');
const servicesRouter = express.Router();

const { createService, getAllServices, getServiceById,
    getServicesByUser, updateService,deleteService } = require('../db/services');

// Endpoint to createService
servicesRouter.post('/', async (req, res, next) => {
    try {
        const service = await createService(req.body);
        res.send(service);
    } catch (error) {
        next(error);
    }
});

// Endpoint to getAllServices
servicesRouter.get('/', async (req, res, next) => {
    try {
        const services = await getAllServices();
        res.send(services);
    } catch (error) {
        next(error);
    }
});

// Endpoint to getServiceById
servicesRouter.get('/:id', async (req, res, next) => {
    try {
        const service = await getServiceById(req.params.id);
        res.send(service);
    } catch (error) {
        next(error);
    }
});

// Endpoint to getServicesByUser
servicesRouter.get('/user/:userId', async (req, res, next) => {
    try {
        const services = await getServicesByUser(req.params.userId);
        res.send(services);
    } catch (error) {
        next(error);
    }
});

// Endpoint to updateService
servicesRouter.patch('/:id', async (req, res, next) => {
    try {
        const updatedService = await updateService({...req.body, id: req.params.id});
        res.send(updatedService);
    } catch (error) {
        next(error);
    }
});

// Endpoint to deleteService
servicesRouter.delete('/:id', async (req, res, next) => {
    try {
        const deletedService = await deleteService(req.params.id);
        res.send(deletedService);
    } catch (error) {
        next(error);
    }
});

// Exports
module.exports = {
    servicesRouter
};