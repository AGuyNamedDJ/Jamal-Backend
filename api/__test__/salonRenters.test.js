const request = require('supertest');
const { app } = require('../../server');
const {
    createRenter,
    getRenterById,
    updateRenter,
    deleteRenter
} = require('../../db/salonRenters');

describe('Salon Renters API', () => {
    it('POST /api/renter - should create a new renter', async () => {
        const newRenter = {
            user_id: 1,
            suite_id: 1,
            rent_start_date: "2023-07-01",
            rent_end_date: "2023-12-31",
            monthly_rental_fee: 1000,
            lease_contract_link: "http://example.com/contract.pdf"
        };

        const response = await request(app).post('/api/renter').send(newRenter);
        expect(response.status).toEqual(200);
        
        const expectedResponse = {
            ...newRenter,
            monthly_rental_fee: response.body.monthly_rental_fee,
            rent_start_date: response.body.rent_start_date,
            rent_end_date: response.body.rent_end_date
        };
        
        expect(response.body).toMatchObject(expectedResponse);
    });
});
