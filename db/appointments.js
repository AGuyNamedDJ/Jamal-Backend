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
        const updateFields = [];
        const updateValues = [];

        if (userId !== undefined) {
            updateFields.push(`user_id = $${updateValues.length + 1}`);
            updateValues.push(userId);
        }

        if (serviceId !== undefined) {
            updateFields.push(`service_id = $${updateValues.length + 1}`);
            updateValues.push(serviceId);
        }

        if (renterId !== undefined) {
            updateFields.push(`renter_id = $${updateValues.length + 1}`);
            updateValues.push(renterId);
        }

        if (appointmentDate !== undefined) {
            updateFields.push(`appointment_date = $${updateValues.length + 1}`);
            updateValues.push(appointmentDate);
        }

        if (appointmentEndDate !== undefined) {
            updateFields.push(`appointment_end_date = $${updateValues.length + 1}`);
            updateValues.push(appointmentEndDate);
        }

        if (status !== undefined) {
            updateFields.push(`status = $${updateValues.length + 1}`);
            updateValues.push(status);
        }

        // Always push id at the end, because it's used in the WHERE clause
        updateValues.push(id);

        const { rows: [appointment] } = await client.query(`
            UPDATE appointments
            SET ${updateFields.join(", ")}
            WHERE id = $${updateValues.length}
            RETURNING *;
        `, updateValues);

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