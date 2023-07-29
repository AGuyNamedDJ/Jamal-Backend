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
        console.error(`Could not create renter for user ID ${user_id} in suite ID ${suite_id}`);
        console.error("Error details: ", error);
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
        console.error(`Could not get renter with ID ${id}`);
        console.error("Error details: ", error);
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
        console.error(`Could not get renters for user ID ${user_id}`);
        console.error("Error details: ", error);
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
        console.error("Could not get all renters.");
        console.error("Error details: ", error);
        throw error;
    }
};

// Method: updateRenter
async function updateRenter(renter) {
    const { id, ...fieldsToUpdate } = renter;
    
    // Build the SET clause of the update statement
    const setClause = Object.keys(fieldsToUpdate).map((field, index) => `"${field}"=$${index + 1}`).join(", ");
  
    // Build the query
    const query = `UPDATE salon_renters SET ${setClause} WHERE id=$${Object.keys(fieldsToUpdate).length + 1} RETURNING *`;
  
    // Execute the query
    const result = await client.query(query, [...Object.values(fieldsToUpdate), id]);
  
    return result.rows[0];
  }
  

// Method: deleteRenter
async function deleteRenter(id) {
    try {
        await client.query(`
            DELETE FROM salon_renters
            WHERE id = $1;
        `, [id]);
    } catch (error) {
        console.error(`Could not delete renter with ID ${id}`);
        console.error("Error details: ", error);
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