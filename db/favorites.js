// Requires
const { client } = require('./index');

// Method: createFavorite
async function createFavorite({ user_id, service_id, renter_id }) {
    try {
        const { rows: [favorite] } = await client.query(`
            INSERT INTO favorites(user_id, service_id, renter_id)
            VALUES($1, $2, $3)
            RETURNING *;
        `, [user_id, service_id, renter_id]);

        return favorite;
    } catch (error) {
        throw error;
    }
};

// Method: getAllFavorites
async function getAllFavorites() {
    try {
        const { rows } = await client.query(`
            SELECT *
            FROM favorites;
        `);

        return rows;
    } catch (error) {
        throw error;
    }
};

// Method: getFavoriteById
async function getFavoriteById(id) {
    try {
        const { rows: [favorite] } = await client.query(`
            SELECT *
            FROM favorites
            WHERE id = $1;
        `, [id]);

        return favorite;
    } catch (error) {
        throw error;
    }
};

// Method: deleteFavorite
async function deleteFavorite(id) {
    try {
        const { rows: [favorite] } = await client.query(`
            DELETE FROM favorites
            WHERE id = $1
            RETURNING *;
        `, [id]);

        return favorite;
    } catch (error) {
        throw error;
    }
};

// Exports
module.exports = {
    createFavorite,
    getAllFavorites,
    getFavoriteById,
    deleteFavorite
};