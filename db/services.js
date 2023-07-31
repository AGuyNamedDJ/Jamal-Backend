// Requires
const { client } = require('../db');

// Method: createService
async function createService({ user_id, name, description, price, duration, image_link }) {
    try {
        const { rows: [service] } = await client.query(`
            INSERT INTO services(user_id, name, description, price, duration, image_link)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `, [user_id, name, description, price, duration, image_link]);

        return service;
    } catch (error) {
        console.error("Could not create service.");
        console.log(error);
        throw error;
    }
};

// Method: getAllServices
async function getAllServices() {
    try {
        const { rows } = await client.query(`
            SELECT *
            FROM services;
        `);
        return rows;
    } catch (error) {
        console.error("Could not get all services.");
        console.log(error);
        throw error;
    }
};

// Method: getServiceById
async function getServiceById(id) {
    try {
        const { rows: [service] } = await client.query(`
            SELECT *
            FROM services
            WHERE id = $1;
        `, [id]);

        return service;
    } catch (error) {
        console.error("Could not get service by id.");
        console.log(error);
        throw error;
    }
};

// Method: getServicesByUser
async function getServicesByUser(userId) {
    try {
        const { rows: services } = await client.query(`
            SELECT *
            FROM services
            WHERE user_id = $1;
        `, [userId]);

        return services;
    } catch (error) {
        console.error("Could not get services by user.");
        console.log(error);
        throw error;
    }
};

// Method: updateService
async function updateService({ id, name, description, price, duration, image_link }) {
    try {
        const { rows: [service] } = await client.query(`
            UPDATE services
            SET name = $2, description = $3, price = $4, duration = $5, image_link = $6
            WHERE id = $1
            RETURNING *;
        `, [id, name, description, price, duration, image_link]);

        return service;
    } catch (error) {
        console.error("Could not update service.");
        console.log(error);
        throw error;
    }
};

// Method: deleteService
async function deleteService(id) {
    try {
        const { rows: [service] } = await client.query(`
            DELETE FROM services
            WHERE id = $1
            RETURNING *;
        `, [id]);

        return service;
    } catch (error) {
        console.error("Could not delete service.");
        console.log(error);
        throw error;
    }
};

// Exports
module.exports = {
    createService,
    getAllServices,
    getServiceById,
    getServicesByUser,
    updateService,
    deleteService
};