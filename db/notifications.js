// Requires
const { client } = require("./index");

// Method: createNotification
async function createNotification({ userId, type, content }) {
    try {
        const { rows: [notification] } = await client.query(`
            INSERT INTO notifications(user_id, type, content) 
            VALUES($1, $2, $3)
            RETURNING *;
        `, [userId, type, content]);

        return notification;
    } catch (error) {
        throw error;
    }
};

// Method: getAllNotifications
async function getAllNotifications() {
    try {
        const { rows } = await client.query(`
            SELECT *
            FROM notifications;
        `);

        return rows;
    } catch (error) {
        throw error;
    }
};

// Method: getNotificationById
async function getNotificationById(id) {
    try {
        const { rows: [notification] } = await client.query(`
            SELECT *
            FROM notifications
            WHERE id = $1;
        `, [id]);

        return notification;
    } catch (error) {
        throw error;
    }
};

// Method: updateNotification
async function updateNotification(id, fields = {}) {
    const setString = Object.keys(fields).map((key, index) => 
        `"${key}"=$${index + 1}`
    ).join(', ');

    if (setString.length === 0) {
        return;
    }

    try {
        const { rows: [notification] } = await client.query(`
            UPDATE notifications
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, Object.values(fields));

        return notification;
    } catch (error) {
        throw error;
    }
};

// Method: deleteNotification
async function deleteNotification(id) {
    try {
        const { rows: [notification] } = await client.query(`
            DELETE FROM notifications
            WHERE id=$1
            RETURNING *;
        `, [id]);

        return notification;
    } catch (error) {
        throw error;
    }
};

// Exports
module.exports = {
    createNotification,
    getAllNotifications,
    getNotificationById,
    updateNotification,
    deleteNotification
};