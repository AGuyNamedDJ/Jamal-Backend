// Requires
const { client } = require('./index');

// Method: createRenter
async function createRenter({ user_id, suite_id, rent_start_date, rent_end_date, monthly_rental_fee, lease_contract_link }) {
    try {
        const { rows: [renter] } = await client.query(`
            INSERT INTO salon_renters(user_id, suite_id, rent_start_date, rent_end_date, monthly_rental_fee, lease_contract_link) 
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `, [user_id, suite_id, rent_start_date, rent_end_date, monthly_rental_fee, lease_contract_link]);

        return renter;
    } catch (error) {
        throw error;
    }
};

// Method: getRenterById
async function getRenterById(id) {
    try {
        const { rows: [renter] } = await client.query(`
            SELECT * FROM salon_renters
            WHERE id = $1;
        `, [id]);

        return renter;
    } catch (error) {
        throw error;
    }
};

// Method: getRentersByUserId
async function getRentersByUserId(user_id) {
    try {
        const { rows: renters } = await client.query(`
            SELECT * FROM salon_renters
            WHERE user_id = $1;
        `, [user_id]);

        return renters;
    } catch (error) {
        throw error;
    }
};

// Method: getAllRenters
async function getAllRenters() {
    try {
        const { rows: renters } = await client.query(`
            SELECT * FROM salon_renters;
        `);

        return renters;
    } catch (error) {
        throw error;
    }
};

// Method: updateRenter
async function updateRenter({ id, user_id, suite_id, rent_start_date, rent_end_date, monthly_rental_fee, lease_contract_link }) {
    try {
        const { rows: [renter] } = await client.query(`
            UPDATE salon_renters
            SET user_id = $1,
                suite_id = $2,
                rent_start_date = $3,
                rent_end_date = $4,
                monthly_rental_fee = $5,
                lease_contract_link = $6
            WHERE id = $7
            RETURNING *;
        `, [user_id, suite_id, rent_start_date, rent_end_date, monthly_rental_fee, lease_contract_link, id]);

        return renter;
    } catch (error) {
        throw error;
    }
};

// Method: deleteRenter
async function deleteRenter(id) {
    try {
        await client.query(`
            DELETE FROM salon_renters
            WHERE id = $1;
        `, [id]);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createRenter,
    getRenterById,
    getRentersByUserId,
    getAllRenters,
    updateRenter,
    deleteRenter
};