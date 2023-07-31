// Requires
const express = require('express');
const favoritesRouter = express.Router();
const { createFavorite, getAllFavorites,
    getFavoriteById,deleteFavorite } = require('../db/favorites');

// Endpoint to get all
favoritesRouter.use((req, res, next) => {
    console.log("A request is being made to /favorites");

    next();
});

// Endpoint to createFavorite
favoritesRouter.post('/', async (req, res, next) => {
    try {
        const favorite = await createFavorite(req.body);
        res.send(favorite);
    } catch (error) {
        next(error);
    }
});

// Endpoint to getAllFavorites
favoritesRouter.get('/', async (req, res, next) => {
    try {
        const favorites = await getAllFavorites();
        res.send(favorites);
    } catch (error) {
        next(error);
    }
});

// Endpoint to getFavoriteById
favoritesRouter.get('/:id', async (req, res, next) => {
    try {
        const favorite = await getFavoriteById(req.params.id);
        res.send(favorite);
    } catch (error) {
        next(error);
    }
});

// Endpoint to deleteFavorite
favoritesRouter.delete('/:id', async (req, res, next) => {
    try {
        const favorite = await deleteFavorite(req.params.id);
        res.send(favorite);
    } catch (error) {
        next(error);
    }
});

// Exports
module.exports = {
    favoritesRouter
};