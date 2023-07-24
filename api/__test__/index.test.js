// Requires
const request = require('supertest');
const { app } = require('../../server');

// Test 1: Server Running [Satisfied]
describe('Express Server', () => {
    it('should respond with a 404 status as the route is not defined', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(404);
    });
});

// Test 2: API route
describe('API route', () => {
    it('should respond with a 200 status and a message', async () => {
        const res = await request(app).get('/api');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'API is running');
    });
});

// Test 3: Get all users
describe('GET /users', () => {
    it('should respond with a 200 status and a list of users', async () => {
        const res = await request(app).get('/api/users');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('users');
        expect(Array.isArray(res.body.users)).toBe(true);
    });
});