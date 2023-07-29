const request = require('supertest');
const { app } = require('../../server');
const {
    createRenter,
    getRenterById,
    updateRenter,
    deleteRenter
} = require('../../db/salonRenters');

describe('Salon Renters API', () => {
    it('POST /api/renter and GET /api/renter/:id', async () => {
        // Create a new renter
        const newRenter = {
            user_id: 1,
            suite_id: 1,
            rent_start_date: "2023-07-01",
            rent_end_date: "2023-12-31",
            monthly_rental_fee: 1000,
            lease_contract_link: "http://example.com/contract.pdf"
        };

        let response = await request(app).post('/api/renter').send(newRenter);
        expect(response.status).toEqual(200);
        
        const expectedResponse = {
            ...newRenter,
            monthly_rental_fee: response.body.monthly_rental_fee,
            rent_start_date: response.body.rent_start_date,
            rent_end_date: response.body.rent_end_date
        };
        
        expect(response.body).toMatchObject(expectedResponse);

        createdRenterId = response.body.id;
    });

    it('GET /api/renter/:id - should return the renter with the given id', async () => {
        const response = await request(app).get(`/api/renter/${createdRenterId}`);
        expect(response.status).toEqual(200);
        expect(response.body.id).toEqual(createdRenterId);
    });

    it('PATCH /api/renter/:id - should update the renter with the given id', async () => {
        const updates = { monthly_rental_fee: 1200 };
    
        const response = await request(app).patch(`/api/renter/${createdRenterId}`).send(updates);
        expect(response.status).toEqual(200);
        expect(response.body.monthly_rental_fee).toEqual("1200.00");
    });
    

    it('DELETE /api/renter/:id - should delete the renter with the given id', async () => {
        const response = await request(app).delete(`/api/renter/${createdRenterId}`);
        expect(response.status).toEqual(200);
    
        const deletedRenter = await getRenterById(createdRenterId);
        expect(deletedRenter).toBeUndefined();
    });
});


