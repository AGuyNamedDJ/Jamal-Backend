// Requires
const express = require('express');
const reviewsRouter = express.Router();
const { createReview, getAllReviews, getReviewById, updateReview, deleteReview } = require('../db/reviews');

// Route: Get all reviews
reviewsRouter.get('/', async (req, res, next) => {
    try {
        const reviews = await getAllReviews();

        res.send({
            reviews
        });
    } catch (error) {
        next(error);
    }
});

// Route: Get a specific review by id
reviewsRouter.get('/:reviewId', async (req, res, next) => {
    try {
        const review = await getReviewById(req.params.reviewId);

        res.send({
            review
        });
    } catch (error) {
        next(error);
    }
});

// Route: Create a new review
reviewsRouter.post('/', async (req, res, next) => {
    try {
        const review = await createReview(req.body);

        res.send({
            review
        });
    } catch (error) {
        next(error);
    }
});

// Route: Update a review
reviewsRouter.patch('/:reviewId', async (req, res, next) => {
    const id = req.params.reviewId;

    try {
        const updatedReview = await updateReview({
            id,
            ...req.body
        });

        res.send({
            review: updatedReview
        });
    } catch (error) {
        next(error);
    }
});

// Route: Delete a review
reviewsRouter.delete('/:reviewId', async (req, res, next) => {
    try {
        const result = await deleteReview(req.params.reviewId);

        res.send({
            result
        });
    } catch (error) {
        next(error);
    }
});

module.exports = {
    reviewsRouter
};