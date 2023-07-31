// Requires
const { client } = require("./index");

// Method: createReview
async function createReview({ userId, serviceId, rating, content }) {
    try {
        const { rows: [review] } = await client.query(`
            INSERT INTO reviews(user_id, service_id, rating, content)
            VALUES($1, $2, $3, $4)
            RETURNING *;
        `, [userId, serviceId, rating, content]);

        return review;
    } catch (error) {
        console.error("Could not create review.");
        console.log(error);
        throw error;
    }
};

// Method: getAllReviews
async function getAllReviews() {
    try {
        const { rows: reviews } = await client.query(`
            SELECT *
            FROM reviews;
        `);

        return reviews;
    } catch (error) {
        console.error("Could not get all reviews.");
        console.log(error);
        throw error;
    }
};

// Method: getReviewById
async function getReviewById(id) {
    try {
        const { rows: [review] } = await client.query(`
            SELECT *
            FROM reviews
            WHERE id = $1;
        `, [id]);

        return review;
    } catch (error) {
        console.error("Could not get review.");
        console.log(error);
        throw error;
    }
};

// Method: updateReview
async function updateReview({ id, rating, content }) {
    try {
        const { rows: [review] } = await client.query(`
            UPDATE reviews
            SET rating = $1,
                content = $2
            WHERE id = $3
            RETURNING *;
        `, [rating, content, id]);

        return review;
    } catch (error) {
        console.error("Could not update review.");
        console.log(error);
        throw error;
    }
};

// Method: deleteReview
async function deleteReview(id) {
    try {
        const result = await client.query(`
            DELETE FROM reviews
            WHERE id = $1;
        `, [id]);

        return result;
    } catch (error) {
        console.error("Could not delete review.");
        console.log(error);
        throw error;
    }
};

// Exports
module.exports = {
    createReview,
    getReviewById,
    getAllReviews,
    updateReview,
    deleteReview
};