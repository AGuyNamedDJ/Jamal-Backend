// Requires
const { client } = require("./index");

// Method: createAppointment
async function createAppointment({ userId, serviceId, renterId, appointmentDate, appointmentEndDate }) {
    try {
        const { rows: [appointment] } = await client.query(`
            INSERT INTO appointments(user_id, service_id, renter_id, appointment_date, appointment_end_date)
            VALUES($1, $2, $3, $4, $5)
            RETURNING *;
        `, [userId, serviceId, renterId, appointmentDate, appointmentEndDate]);

        return appointment;
    } catch (error) {
        console.error("Could not create appointment.");
        console.log(error);
        throw error;
    }
};

// Method: getAllAppointments
async function getAllAppointments() {
    try {
        const { rows: appointments } = await client.query(`
            SELECT *
            FROM appointments;
        `);

        return appointments;
    } catch (error) {
        console.error("Could not get all appointments.");
        console.log(error);
        throw error;
    }
};

// Method: getAppointmentById
async function getAppointmentById(id) {
    try {
        const { rows: [appointment] } = await client.query(`
            SELECT *
            FROM appointments
            WHERE id = $1;
        `, [id]);

        return appointment;
    } catch (error) {
        console.error("Could not get appointment.");
        console.log(error);
        throw error;
    }
};

// Method: updateAppointment
async function updateAppointment({ id, userId, serviceId, renterId, appointmentDate, appointmentEndDate, status }) {
    try {
        const { rows: [appointment] } = await client.query(`
            UPDATE appointments
            SET user_id = $1,
                service_id = $2,
                renter_id = $3,
                appointment_date = $4,
                appointment_end_date = $5,
                status = $6
            WHERE id = $7
            RETURNING *;
        `, [userId, serviceId, renterId, appointmentDate, appointmentEndDate, status, id]);

        return appointment;
    } catch (error) {
        console.error("Could not update appointment.");
        console.log(error);
        throw error;
    }
};

// Method: deleteAppointment
async function deleteAppointment(id) {
    try {
        const result = await client.query(`
            DELETE FROM appointments
            WHERE id = $1;
        `, [id]);

        return result;
    } catch (error) {
        console.error("Could not delete appointment.");
        console.log(error);
        throw error;
    }
};

module.exports = {
    createAppointment,
    getAppointmentById,
    getAllAppointments,
    updateAppointment,
    deleteAppointment
};