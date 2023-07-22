// Requires
const { client } = require("./index");

// Method: createMessage
async function createMessage({ sender_id, receiver_id, content }) {
    try {
        const { rows: [message] } = await client.query(`
            INSERT INTO messages(sender_id, receiver_id, content) 
            VALUES($1, $2, $3) 
            RETURNING *;
        `, [sender_id, receiver_id, content]);

        return message;
    } catch (error) {
        throw error;
    }
};

// Method: getAllMessages
async function getAllMessages() {
    try {
        const { rows: messages } = await client.query(`
            SELECT *
            FROM messages;
        `);

        return messages;
    } catch (error) {
        throw error;
    }
};

// Method: getMessagesByUserId
async function getMessagesByUserId(userId) {
    try {
        const { rows: messages } = await client.query(`
            SELECT *
            FROM messages
            WHERE sender_id = $1 OR receiver_id = $1;
        `, [userId]);

        return messages;
    } catch (error) {
        throw error;
    }
};

// Method: updateMessage
async function updateMessage(id, fields = {}) {
    const setString = Object.keys(fields).map((key, index) =>
        `"${key}"=$${index + 1}`
    ).join(', ');

    if (setString.length === 0) {
        return;
    }

    try {
        const { rows: [message] } = await client.query(`
            UPDATE messages
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, Object.values(fields));

        return message;
    } catch (error) {
        throw error;
    }
};

// Method: deleteMessage
async function deleteMessage(id) {
    try {
        const { rows: [message] } = await client.query(`
            DELETE FROM messages
            WHERE id=$1
            RETURNING *;
        `, [id]);

        return message;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createMessage,
    getMessagesByUserId,
    updateMessage,
    deleteMessage,
    getAllMessages,
};