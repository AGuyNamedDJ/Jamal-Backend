// Requires
const request = require('supertest');
const { app } = require('../../server');
const { createMessage, deleteMessage } = require('../../db/messages');

describe("Test the messages routes", () => {
    test("should respond to the GET method", async () => {
        const response = await request(app).get('/api/messages');
        expect(response.statusCode).toBe(200);
    });

    test("should respond to the POST method", async () => {
        const newMessageData = {
            sender_id: 1,
            receiver_id: 2,
            content: "Hello, how are you?"
        };
        const response = await request(app).post('/api/messages').send(newMessageData);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
        // Delete the newly created message after test
        await deleteMessage(response.body.id);
    });

    test("should respond to the DELETE method", async () => {
        // First create a message to delete
        const message = await createMessage({
            sender_id: 1,
            receiver_id: 2,
            content: "Hello, how are you?"
        });
        const response = await request(app).delete(`/api/messages/${message.id}`);
        expect(response.statusCode).toBe(200);
    });
});