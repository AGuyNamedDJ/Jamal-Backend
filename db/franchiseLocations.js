// Requires
const { client } = require("./index");

// Method: createFranchiseLocation
async function createFranchiseLocation({ name, address, city, state, zip_code, country, phone_number, business_hours, email, additional_info 
}) {
    try {
        const { rows: [location] } = await client.query(`
            INSERT INTO franchise_locations(name, address, city, state, zip_code, country, 
                phone_number, business_hours, email, additional_info
            ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
            RETURNING *;
        `, [name, address, city, state, zip_code, country, phone_number, business_hours, email, additional_info]);

        return location;
    } catch (error) {
        throw error;
    }
};

// Method: getAllFranchiseLocations
async function getAllFranchiseLocations() {
    try {
        const { rows } = await client.query(`
            SELECT *
            FROM franchise_locations;
        `);

        return rows;
    } catch (error) {
        throw error;
    }
};

// Method: getFranchiseLocationById
async function getFranchiseLocationById(id) {
    try {
        const { rows: [location] } = await client.query(`
            SELECT *
            FROM franchise_locations
            WHERE id = $1;
        `, [id]);

        return location;
    } catch (error) {
        throw error;
    }
};

// Method: getFranchiseLocationByName
async function getFranchiseLocationByName(name) {
    try {
        const { rows: [location] } = await client.query(`
            SELECT *
            FROM franchise_locations
            WHERE name = $1;
        `, [name]);

        return location;
    } catch (error) {
        throw error;
    }
};

// Method: updateFranchiseLocation
async function updateFranchiseLocation(id, fields = {}) {
    const setString = Object.keys(fields).map((key, index) => 
        `"${key}"=$${index + 1}`
    ).join(', ');

    if (setString.length === 0) {
        return;
    }

    try {
        const { rows: [location] } = await client.query(`
            UPDATE franchise_locations
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, Object.values(fields));

        return location;
    } catch (error) {
        throw error;
    }
};

// Method: deleteFranchiseLocation
async function deleteFranchiseLocation(id) {
    try {
        const { rows: [location] } = await client.query(`
            DELETE FROM franchise_locations
            WHERE id=$1
            RETURNING *;
        `, [id]);

        return location;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createFranchiseLocation,
    getAllFranchiseLocations,
    getFranchiseLocationById,
    updateFranchiseLocation,
    getFranchiseLocationByName,
    deleteFranchiseLocation
};