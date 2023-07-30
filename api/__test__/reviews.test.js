// Requires
const request = require('supertest');
const { app } = require('../../server');
const { createReview, getReviewById, deleteReview } = require('../../db/reviews');

describe("Test the reviews routes", () => {
    let testReview;

    // Set up a test review before each test
    beforeEach(async () => {
        testReview = await createReview({
            userId: 1,
            serviceId: 1,
            rating: 5,
            content: 'Test content'
        });
    });

// Clean up 
afterEach(async () => {
    if(testReview) {
        await deleteReview(testReview.id);
    }
});

    test("should respond to the GET method", async () => {
        const response = await request(app).get(`/api/reviews/${testReview.id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('review');
        expect(response.body.review).toHaveProperty('id', testReview.id);
    });

    test("should respond to the POST method", async () => {
        const newReviewData = {
            userId: 1,
            serviceId: 1,
            rating: 4,
            content: 'Test content for POST'
        };

        const response = await request(app).post('/api/reviews').send(newReviewData);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('review');
        expect(response.body.review).toHaveProperty('rating', newReviewData.rating);

        // Clean up by deleting the review
        await deleteReview(response.body.review.id);
    });

    test("should respond to the PATCH method", async () => {
        const newReviewData = {
            rating: 3,
            content: 'Test content for PATCH'
        };

        const response = await request(app).patch(`/api/reviews/${testReview.id}`).send(newReviewData);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('review');
        expect(response.body.review).toHaveProperty('rating', newReviewData.rating);
    });

    test("should respond to the DELETE method", async () => {
        const response = await request(app).delete(`/api/reviews/${testReview.id}`);

        expect(response.statusCode).toBe(200);

        // Try to get the review we just deleted, should not exist
        const deletedReview = await getReviewById(testReview.id);

        expect(deletedReview).toBeUndefined();

        // Set testReview to null so the afterEach doesn't fail trying to delete it again
        testReview = null;
    });
});