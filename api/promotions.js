// Requires
const express = require('express');
const promotionsRouter = express.Router();
const { createPromotion, getAllPromotions, getPromotionById,
    updatePromotion, deletePromotion } = require('../db/promotions');

promotionsRouter.use((req, res, next) => {
    console.log("A request is being made to /promotions");

    next(); 
});

// GET /api/promotions
promotionsRouter.get('/', async (req, res, next) => {
    try {
        const promotions = await getAllPromotions();
        res.send(promotions);
    } catch (error) {
        next(error);
    }
});

// GET /api/promotions/:id
promotionsRouter.get('/:id', async (req, res, next) => {
    try {
        const promotion = await getPromotionById(req.params.id);
        res.send(promotion);
    } catch (error) {
        next(error);
    }
});

// POST /api/promotions
promotionsRouter.post('/', async (req, res, next) => {
    try {
        const promotion = await createPromotion(req.body);
        res.send(promotion);
    } catch (error) {
        next(error);
    }
});

// PATCH /api/promotions/:id
promotionsRouter.patch('/:id', async (req, res, next) => {
    try {
        const updatedPromotion = await updatePromotion(req.params.id, req.body);
        res.send(updatedPromotion);
    } catch (error) {
        next(error);
    }
});

// DELETE /api/promotions/:id
promotionsRouter.delete('/:id', async (req, res, next) => {
    try {
        const deletedPromotion = await deletePromotion(req.params.id);
        res.send(deletedPromotion);
    } catch (error) {
        next(error);
    }
});

// Exports
module.exports = {
    promotionsRouter
};