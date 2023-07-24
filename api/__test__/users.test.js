// Requires
const request = require('supertest');
const { app } = require('../../server');
const { createUser, deleteUser, getUserByUsername } = require('../../db/users');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

// Function for setting up database
async function setupDatabase() {
    await createUser({
        username: 'Owner1', 
        password: 'Dalron', 
        email: 'user1@example.com', 
        full_name: 'Dalron J. Robertson', 
        user_role: 'stylist', 
        profile_image: 'url', 
        phone_number: '123-456-7890'
    });
    await createUser({
        username: 'Owner2', 
        password: 'Dalron', 
        email: 'user2@example.com', 
        full_name: 'Mrs. Robertson', 
        user_role: 'customer', 
        profile_image: 'url', 
        phone_number: '123-456-7891'
    });
}

// Function for cleaning up database
async function cleanupDatabase() {
    await deleteUser('Owner1');
    await deleteUser('Owner2');
    await deleteUser('TestUser');
}

describe('User API', () => {
    // Run the setup function before tests
    beforeAll(async () => {
        await setupDatabase();
    });

    describe('GET /users', () => {
        it('should show all users', async () => {
            const res = await request(app).get('/api/users');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('users');
        });
    });

    describe('GET /users/profile/:username', () => {
        it('should show specific user profile', async () => {
            const user = await getUserByUsername('Owner1');
            const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1w" });

            const res = await request(app).get('/api/users/profile/Owner1').set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('myUserInfo');
            expect(res.body.myUserInfo.username).toEqual('Owner1');
        });
    });

    describe('POST /users/register', () => {
        it('should register a new user', async () => {
            const res = await request(app)
                .post('/api/users/register')
                .send({
                    username: 'TestUser', 
                    password: 'TestPassword', 
                    email: 'testuser@example.com', 
                    full_name: 'Test User', 
                    user_role: 'customer', 
                    profile_image: 'url', 
                    phone_number: '123-456-7893'
                });
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('user');
            expect(res.body.user.username).toEqual('TestUser');
        });
    });

    describe('POST /users/login', () => {
        it('should login an existing user', async () => {
            const res = await request(app)
                .post('/api/users/login')
                .send({
                    username: 'Owner1', 
                    password: 'Dalron'
                });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('token');
        });
    });

    // Run the cleanup function after tests
    afterAll(async () => {
        await cleanupDatabase();
    });
});
