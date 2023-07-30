// Requires
const request = require('supertest');
const { app } = require('../../server');
const {
    createPayment,
    getPaymentById,
    deletePayment
} = require('../../db/payments'); 

describe('Test the payments routes', () => {
    let testPayment;
    
    beforeAll(async () => {
        // Create a test payment before running the tests
        testPayment = await createPayment({
            userId: 1, 
            appointmentId: 1, 
            amount: 100.00, 
            paymentDate: new Date(), 
            transactionId: '123abc', 
            status: 'Completed', 
            paymentMethod: 'Credit Card'
        });
    });

    afterAll(async () => {
        // Clean up the test payment after the tests
        await deletePayment(testPayment.id);
    });

    test('should respond to the GET method', async () => {
        const response = await request(app).get(`/api/payments/${testPayment.id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id', testPayment.id);
    });

    test('should respond to the PATCH method', async () => {
        const newPaymentData = {
            userId: testPayment.user_id, // Modified
            appointmentId: testPayment.appointment_id, // Modified
            amount: 120.00,
            paymentDate: new Date(),
            transactionId: '123abc',
            status: 'Completed',
            paymentMethod: 'Credit Card'
        };
        console.log('testPayment:', testPayment);
        console.log('newPaymentData:', newPaymentData);
    
        const response = await request(app).patch(`/api/payments/${testPayment.id}`).send(newPaymentData);
        expect(response.statusCode).toBe(200);
        expect(parseFloat(response.body.amount)).toBe(newPaymentData.amount); // Changed this line
    });  
    
    
    test('should respond to the DELETE method', async () => {
        const response = await request(app).delete(`/api/payments/${testPayment.id}`);
        expect(response.statusCode).toBe(204);
        // After deleting, we should get an error if we try to get the payment again
        const getResponse = await request(app).get(`/api/payments/${testPayment.id}`);
        expect(getResponse.statusCode).toBe(404);
    });   
});