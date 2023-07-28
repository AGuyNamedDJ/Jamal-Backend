// Requires
const request = require('supertest');
const { app } = require('../../server');
const { createFranchiseLocation, getAllFranchiseLocations } = require('../../db/franchiseLocations');
describe('Franchise Locations API', () => {
    it('GET /api/locations - should return all locations', async () => {
        const response = await request(app).get('/api/locations');
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(expect.arrayContaining([expect.any(Object)]));
    });

    it('POST /api/locations - should create a new location', async () => {
        const newLocation = {
            name: 'New Salon',
            address: '123 Main St',
            city: 'Los Angeles',
            state: 'CA',
            zip_code: '90000',
            country: 'USA',
            phone_number: '111-111-1111',
            business_hours: '9 AM - 6 PM',
            email: 'test@test.com',
            additional_info: 'Extra info here'
        };

        const response = await request(app).post('/api/locations').send(newLocation);
        expect(response.status).toEqual(200);
        expect(response.body).toMatchObject(newLocation);
    });
    // Add more tests for GET /api/locations/:id, PATCH /api/locations/:id, and DELETE /api/locations/:id as needed
});