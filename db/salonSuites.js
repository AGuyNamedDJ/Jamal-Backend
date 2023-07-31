// Requires
const { client } = require("./index");

// Method: createSuite
async function createSuite({ user_id, franchise_location_id, suite_number, services }) {
    try {
        console.log(`Inserting salon suite ${suite_number} into database`);

        const result = await client.query(`
            INSERT INTO salon_suites(user_id, franchise_location_id, suite_number, services) 
            VALUES($1, $2, $3, $4)
            RETURNING *;
        `, [user_id, franchise_location_id, suite_number, services]);

        const suite = result.rows[0];
        console.log(`Salon suite ${suite_number} inserted into database`);
        return suite;
    } catch (error) {
        console.error(`Could not create salon suite ${suite_number}`);
        console.error("Error details: ", error);
        throw error;
    }
};

// Method: getSuiteById
async function getSuiteById(id) {
    try {
        const { rows: [suite] } = await client.query(`
            SELECT * FROM salon_suites
            WHERE id = $1;
        `, [id]);

        if (!suite) {
            return null;
        }
        return suite;
    } catch (error) {
        console.error(`Could not get salon suite with ID ${id}`);
        console.error(error);
        throw error;
    }
};

// Method: getAllSuites
async function getAllSuites() {
    try {
        const { rows } = await client.query(`
            SELECT * FROM salon_suites;
        `);

        return rows;
    } catch (error) {
        console.error("Could not get all salon suites.");
        console.error(error);
        throw error;
    }
};

// Method: updateSuite
async function updateSuite(suite) {
    try {
        console.log(`Updating salon suite with ID ${suite.id}`);

        let setClause = "";
        const values = [];
        let count = 1;

        // Dynamically create the SET clause based on the properties in the suite object
        for (let prop in suite) {
            if (suite.hasOwnProperty(prop) && prop !== 'id') {
                setClause += `${prop} = $${count}, `;
                values.push(suite[prop]);
                count++;
            }
        }

        // Remove trailing comma + space
        setClause = setClause.slice(0, -2);

        const query = `
            UPDATE salon_suites
            SET ${setClause}
            WHERE id = $${count}
            RETURNING *;
        `;

        values.push(suite.id);

        const result = await client.query(query, values);
        
        const updatedSuite = result.rows[0];
        console.log(`Salon suite with ID ${suite.id} updated.`);
        return updatedSuite;

    } catch (error) {
        console.error(`Could not update salon suite with ID ${suite.id}`);
        console.error("Error details: ", error);
        throw error;
    }
};

// Method: deleteSuite
async function deleteSuite(id) {
    try {
        console.log(`Deleting salon suite with ID ${id}`);
        await client.query(`
            DELETE FROM salon_suites
            WHERE id = $1;
        `, [id]);

        console.log(`Salon suite with ID ${id} deleted.`);
    } catch (error) {
        console.error(`Could not delete salon suite with ID ${id}`);
        console.error("Error details: ", error);
        throw error;
    }
};

// Exports
module.exports = {
    createSuite,
    getSuiteById,
    getAllSuites,
    updateSuite,
    deleteSuite
};