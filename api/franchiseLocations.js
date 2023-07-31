// Requires
const express = require('express');
const franchiseLocationsRouter = express.Router();
const { createFranchiseLocation, getAllFranchiseLocations, getFranchiseLocationById,
    updateFranchiseLocation, getFranchiseLocationByName, deleteFranchiseLocation } = require('../db/franchiseLocations');

// Route to get all locations
franchiseLocationsRouter.get('/', async (req, res, next) => {
    try {
        const locations = await getAllFranchiseLocations();
        res.send(locations);
    } catch (error) {
        next(error);
    }
});

// Route to get location by ID
franchiseLocationsRouter.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const location = await getFranchiseLocationById(id);

        if (!location) {
            res.status(404).send({
                name: 'LocationNotFoundError',
                message: 'Could not find location with that ID'
            });
        }

        res.send(location);
    } catch (error) {
        next(error);
    }
});

// Route to create a new location
franchiseLocationsRouter.post('/', async (req, res, next) => {
    try {
        const location = await createFranchiseLocation(req.body);
        res.send(location);
    } catch (error) {
        next(error);
    }
});

// Route to update a location
franchiseLocationsRouter.patch('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { name, address, city, state, zip_code, country,
        phone_number, business_hours, email, additional_info } = req.body;

    const updateFields = {};

    if (name) updateFields.name = name;
    if (address) updateFields.address = address;
    if (city) updateFields.city = city;
    if (state) updateFields.state = state;
    if (zip_code) updateFields.zip_code = zip_code;
    if (country) updateFields.country = country;
    if (phone_number) updateFields.phone_number = phone_number;
    if (business_hours) updateFields.business_hours = business_hours;
    if (email) updateFields.email = email;
    if (additional_info) updateFields.additional_info = additional_info;

    try {
        const updatedLocation = await updateFranchiseLocation(id, updateFields);
        res.send(updatedLocation);
    } catch (error) {
        next(error);
    }
});

// Route to delete a location
franchiseLocationsRouter.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedLocation = await deleteFranchiseLocation(id);
        res.send(deletedLocation);
    } catch (error) {
        next(error);
    }
});

// Exports
module.exports = {
    franchiseLocationsRouter
};