// Requires
const request = require('supertest');
const app = require('../api/index'); // Import your app

// Test 1: getUser
    // Describe
    describe('User API', () => {
        it('should show all users', async () => {
            const res = await request(app)
            .get('/users');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('users');
        }
    );

    // Return
    it('should show specific user', async () => {
        const res = await request(app)
        .get('/users/profile')
        .send({ username: 'testUser' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('myUserInfo');
    });
    });
