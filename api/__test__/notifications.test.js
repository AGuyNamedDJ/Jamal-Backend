// Requires
const request = require('supertest');
const { app } = require('../../server');
const { createNotification, deleteNotification } = require('../../db/notifications');

describe('Test the notifications routes', () => {
    let createdNotificationId;

    // Test the POST method
    it('should respond to the POST method', async () => {
        const newNotificationData = {
            userId: 1,
            type: 'message',
            content: 'Hello, this is a new notification!'
        };
        const response = await request(app).post('/api/notifications').send(newNotificationData);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
        // Store the id of created notification to use in other tests
        createdNotificationId = response.body.id;
    });

    // Test the GET method
    it('should respond to the GET method', async () => {
        const response = await request(app).get(`/api/notifications/${createdNotificationId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toEqual(createdNotificationId);
    });

    // Test the PUT method
    it('should respond to the PUT method', async () => {
        const updatedNotificationData = {
            content: 'Hello, this is an updated notification!'
        };
        const response = await request(app).put(`/api/notifications/${createdNotificationId}`).send(updatedNotificationData);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body.content).toEqual(updatedNotificationData.content);
    });

    // Test the DELETE method
    it('should respond to the DELETE method', async () => {
        const response = await request(app).delete(`/api/notifications/${createdNotificationId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toEqual(createdNotificationId);
    });
});
