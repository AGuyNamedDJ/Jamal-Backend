const request = require('supertest');
const { app } = require('../../server');
const { createService, getServiceById,
    updateService, deleteService } = require('../../db/services');

describe('Services API', () => {
    it('POST /api/services and GET /api/services/:id', async () => {
        const newService = {
            user_id: 1,
            name: "Hair Cut",
            description: "A great haircut",
            price: 50,
            duration: 30,
            image_link: "http://example.com/image.jpg"
        };

        let response = await request(app).post('/api/services').send(newService);
        expect(response.status).toEqual(200);

        const expectedResponse = {
            ...newService,
            price: response.body.price,
            duration: response.body.duration
        };

        expect(response.body).toMatchObject(expectedResponse);
        createdServiceId = response.body.id;
    });

    it('GET /api/services/:id - should return the service with the given id', async () => {
        const response = await request(app).get(`/api/services/${createdServiceId}`);
        expect(response.status).toEqual(200);
        expect(response.body.id).toEqual(createdServiceId);
    });

    it('PATCH /api/services/:id - should update the service with the given id', async () => {
        const updates = {
            name: 'Updated Service Name',
            price: '55.00',
        };
        const response = await request(app).patch(`/api/services/${createdServiceId}`).send(updates);
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(updates.name);
        expect(response.body.price).toEqual(updates.price);
    });

    it('DELETE /api/services/:id - should delete the service with the given id', async () => {
        const response = await request(app).delete(`/api/services/${createdServiceId}`);
        expect(response.status).toEqual(200);

        const deletedService = await getServiceById(createdServiceId);
        expect(deletedService).toBeUndefined();
    });
});