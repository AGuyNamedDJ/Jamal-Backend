const request = require('supertest');
const { app } = require('../../server');
const { createPromotion, getPromotionById, deletePromotion } = require('../../db/promotions');

let testPromotion;

beforeEach(async () => {
    testPromotion = await createPromotion({
        salon_renter_id: 1,
        service_id: 1,
        title: "Test Title",
        description: "Test Description",
        start_date: new Date(),
        end_date: new Date(),
        promo_code: "TEST123",
        discount_type: "percentage",
        discount_value: 10
    });
});

afterEach(async () => {
    await deletePromotion(testPromotion.id);
});

describe('Test the promotions routes', () => {
    test('should respond to the GET method', async () => {
        const response = await request(app).get(`/api/promotions/${testPromotion.id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id', testPromotion.id);
    });

    test('should respond to the POST method', async () => {
        const newPromotionData = {
            salon_renter_id: 1,
            service_id: 1,
            title: "Test Title 2",
            description: "Test Description 2",
            start_date: new Date(),
            end_date: new Date(),
            promo_code: "TEST456",
            discount_type: "percentage",
            discount_value: 15
        };
        const response = await request(app).post('/api/promotions').send(newPromotionData).catch(e => console.error(e));
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
        // Delete the newly created promotion after test
        await deletePromotion(response.body.id);
    });

    test('should respond to the DELETE method', async () => {
        const response = await request(app).delete(`/api/promotions/${testPromotion.id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id', testPromotion.id);
    });
});
