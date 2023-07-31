const request = require('supertest');
const { app } = require('../../server');
const { createFavorite, getFavoriteById, deleteFavorite } = require('../../db/favorites');

let testFavorite;

beforeEach(async () => {
    testFavorite = await createFavorite({
        user_id: 1,
        service_id: 1,
        renter_id: 1
    });
});

afterEach(async () => {
    await deleteFavorite(testFavorite.id);
});

describe('Test the favorites routes', () => {
    test('should respond to the GET method', async () => {
        const response = await request(app).get(`/api/favorites/${testFavorite.id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id', testFavorite.id);
    });

    test('should respond to the POST method', async () => {
        const newFavoriteData = {
            user_id: 1,
            service_id: 1,
            renter_id: 1
        };
        const response = await request(app).post('/api/favorites').send(newFavoriteData).catch(e => console.error(e));
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('user_id', newFavoriteData.user_id);
    });

    test('should respond to the DELETE method', async () => {
        const response = await request(app).delete(`/api/favorites/${testFavorite.id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id', testFavorite.id);
    });
});
