// Requires
const { client } = require("./index");

// Method: createPayment
async function createPayment({ userId, appointmentId, amount, paymentDate, transactionId, status, paymentMethod }) {
    try {
        const { rows: [payment] } = await client.query(`
            INSERT INTO payments(user_id, appointment_id, amount, payment_date, transaction_id, status, payment_method)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `, [userId, appointmentId, amount, paymentDate, transactionId, status, paymentMethod]);

        return payment;
    } catch (error) {
        console.error("Could not create payment.");
        console.log(error);
        throw error;
    }
};

// Method: getPaymentById
async function getPaymentById(id) {
    try {
        const { rows: [payment] } = await client.query(`
            SELECT *
            FROM payments
            WHERE id = $1;
        `, [id]);

        return payment;
    } catch (error) {
        console.error("Could not get payment.");
        console.log(error);
        throw error;
    }
};

// Method: getAllPayments
async function getAllPayments() {
    try {
        const { rows: payments } = await client.query(`
            SELECT *
            FROM payments;
        `);

        return payments;
    } catch (error) {
        console.error("Could not get all payments.");
        console.log(error);
        throw error;
    }
};

// Method: updatePayment
async function updatePayment({ id, userId, appointmentId, amount, paymentDate, transactionId, status, paymentMethod }) {
    try {
        const { rows: [payment] } = await client.query(`
            UPDATE payments
            SET user_id = $1,
                appointment_id = $2,
                amount = $3,
                payment_date = $4,
                transaction_id = $5,
                status = $6,
                payment_method = $7
            WHERE id = $8
            RETURNING *;
        `, [userId, appointmentId, amount, paymentDate, transactionId, status, paymentMethod, id]);

        return payment;
    } catch (error) {
        console.error("Could not update payment.");
        console.log(error);
        throw error;
    }
};

// Method: deletePayment
async function deletePayment(id) {
    try {
        const result = await client.query(`
            DELETE FROM payments
            WHERE id = $1;
        `, [id]);

        return result;
    } catch (error) {
        console.error("Could not delete payment.");
        console.log(error);
        throw error;
    }
};

// Exports
module.exports = {
    createPayment,
    getPaymentById,
    getAllPayments,
    updatePayment,
    deletePayment
};