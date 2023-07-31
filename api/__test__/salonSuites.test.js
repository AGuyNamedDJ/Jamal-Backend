// Requires
const request = require('supertest');
const { app } = require('../../server');
const { createSuite, getSuiteById, getAllSuites,
    updateSuite, deleteSuite} = require('../../db/salonSuites');

describe('Salon Suites API', () => {
    it('GET /api/suites - should return all suites', async () => {
        const response = await request(app).get('/api/suites');
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(expect.arrayContaining([expect.any(Object)]));
    });

    it('POST /api/suites - should create a new suite', async () => {
        const newSuite = {
            user_id: 1,
            franchise_location_id: 1,
            suite_number: '1A',
            services: 'Haircut, Manicure'
        };

        const response = await request(app).post('/api/suites').send(newSuite);
        expect(response.status).toEqual(200);
        expect(response.body).toMatchObject(newSuite);
    });

    it('GET /api/suites/:id - should return the suite with the given id', async () => {
        const testSuite = await createSuite({
            user_id: 1,
            franchise_location_id: 1,
            suite_number: '2B',
            services: 'Haircut, Pedicure'
        });
        
        const response = await request(app).get(`/api/suites/${testSuite.id}`);
        expect(response.status).toEqual(200);
        expect(response.body).toMatchObject(testSuite);
    });

    it('PATCH /api/suites/:id - should update the suite with the given id', async () => {
        const testSuite = await createSuite({
            user_id: 1,
            franchise_location_id: 1,
            suite_number: '3C',
            services: 'Haircut, Facial'
        });

        const updates = { services: 'Haircut, Facial, Manicure' };
        const response = await request(app).patch(`/api/suites/${testSuite.id}`).send(updates);
        expect(response.status).toEqual(200);
        expect(response.body).toMatchObject({ ...testSuite, ...updates });
    });

    it('DELETE /api/suites/:id - should delete the suite with the given id', async () => {
        const testSuite = await createSuite({
            user_id: 1,
            franchise_location_id: 1,
            suite_number: '4D',
            services: 'Manicure, Pedicure'
        });
    
        const response = await request(app).delete(`/api/suites/${testSuite.id}`);
        expect(response.status).toEqual(204);
        const deletedSuite = await getSuiteById(testSuite.id);
        expect(deletedSuite).toBeNull();
    });
});