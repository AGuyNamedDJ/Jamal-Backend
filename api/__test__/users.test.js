// Requires
const request = require('supertest');
const { app } = require('../../server');
const { createUser, deleteUser } = require('../../db/users');

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
}

describe('User API', () => {
    // Run the setup function before tests
    beforeAll(async () => {
        await setupDatabase();
    });

    describe('GET /users', () => {
        it('should show all users', async () => {
            const res = await request(app).get('/users');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('users');
        });
    });

    describe('GET /users/profile', () => {
        it('should show specific user profile', async () => {
            const res = await request(app)
                .get('/users/profile')
                .send({ username: 'Owner1' });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('myUserInfo');
            expect(res.body.myUserInfo.username).toEqual('Owner1');
        });
    });

    // Run the cleanup function after tests
    afterAll(async () => {
        await cleanupDatabase();
    });
});
