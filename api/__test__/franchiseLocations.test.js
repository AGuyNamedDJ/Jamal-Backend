// Requires
const request = require('supertest');
const { app } = require('../../server');
const {     createFranchiseLocation,
    getAllFranchiseLocations,
    getFranchiseLocationById,
    updateFranchiseLocation,
    getFranchiseLocationByName,
    deleteFranchiseLocation} = require('../../db/franchiseLocations');

describe('Franchise Locations API', () => {
    let testLocation;

    beforeAll(async () => {
        testLocation = await createFranchiseLocation({
            name: 'Test Salon',
            address: '123 Test St',
            city: 'Test City',
            state: 'TS',
            zip_code: '10000',
            country: 'USA',
            phone_number: '111-222-3333',
            business_hours: '9 AM - 5 PM',
            email: 'testsalon@test.com',
            additional_info: 'Test info here'
        });
    });

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

    it('GET /api/locations/:id - should return the location with the given id', async () => {
        const response = await request(app).get(`/api/locations/${testLocation.id}`);
        expect(response.status).toEqual(200);
        expect(response.body).toMatchObject(testLocation);
    });

    it('PATCH /api/locations/:id - should update the location with the given id', async () => {
        const updates = { name: 'Updated Salon' };
        const response = await request(app).patch(`/api/locations/${testLocation.id}`).send(updates);
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(updates.name);
    
        // Update the testLocation object with the updated name
        testLocation.name = updates.name;
    });
    
    it('DELETE /api/locations/:id - should delete the location with the given id', async () => {
        const response = await request(app).delete(`/api/locations/${testLocation.id}`);
        expect(response.status).toEqual(200);
        expect(response.body).toMatchObject(testLocation);
        const deletedLocation = await getFranchiseLocationById(testLocation.id);
        expect(deletedLocation).toBeUndefined();
    });
});