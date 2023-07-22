// Requires
const { client } = require('./index');

// Method: createPromotion
async function createPromotion({ salon_renter_id, service_id, title, description, start_date, end_date, promo_code, discount_type, discount_value }) {
    try {
        const { rows: [promotion] } = await client.query(`
            INSERT INTO promotions(salon_renter_id, service_id, title, description, start_date, end_date, promo_code, discount_type, discount_value) 
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *;
        `, [salon_renter_id, service_id, title, description, start_date, end_date, promo_code, discount_type, discount_value]);

        return promotion;
    } catch (error) {
        throw error;
    }
};

// Method: getAllPromotions
async function getAllPromotions() {
    try {
        const { rows } = await client.query(`
            SELECT *
            FROM promotions;
        `);

        return rows;
    } catch (error) {
        throw error;
    }
};

// Method: getPromotionById
async function getPromotionById(id) {
    try {
        const { rows: [promotion] } = await client.query(`
            SELECT *
            FROM promotions
            WHERE id = $1;
        `, [id]);

        return promotion;
    } catch (error) {
        throw error;
    }
};

// Method: updatePromotion
async function updatePromotion(id, fields = {}) {
    const setString = Object.keys(fields).map((key, index) => 
        `"${key}"=$${index + 1}`
    ).join(', ');

    if (setString.length === 0) {
        return;
    }

    try {
        const { rows: [promotion] } = await client.query(`
            UPDATE promotions
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, Object.values(fields));

        return promotion;
    } catch (error) {
        throw error;
    }
};

// Method: deletePromotion
async function deletePromotion(id) {
    try {
        const { rows: [promotion] } = await client.query(`
            DELETE FROM promotions
            WHERE id=$1
            RETURNING *;
        `, [id]);

        return promotion;
    } catch (error) {
        throw error;
    }
};


module.exports = {
    createPromotion,
    getAllPromotions,
    getPromotionById,
    updatePromotion,
    deletePromotion
}; 