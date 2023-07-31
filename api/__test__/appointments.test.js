// Requires
const request = require('supertest');
const { app } = require('../../server');
const { createAppointment, getAppointmentById,
    deleteAppointment } = require('../../db/appointments'); 

describe('Test the appointment routes', () => {
    let testAppointment;
    
    beforeAll(async () => {
        // Create a test appointment before running the tests
        testAppointment = await createAppointment({ userId: 1, serviceId: 1, renterId: 1, appointmentDate: new Date(), appointmentEndDate: new Date() });
    });

    afterAll(async () => {
        // Clean up the test appointment after the tests
        await deleteAppointment(testAppointment.id);
    });

    test('should respond to the GET method', async () => {
        const response = await request(app).get(`/api/appointments/${testAppointment.id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id', testAppointment.id);
    });

    test('should respond to the PATCH method', async () => {
        const newAppointmentData = {
            userId: testAppointment.userId, 
            serviceId: testAppointment.serviceId,
            renterId: testAppointment.renterId,
            appointmentDate: new Date(), 
            appointmentEndDate: new Date()
        };
        const response = await request(app).patch(`/api/appointments/${testAppointment.id}`).send(newAppointmentData);
        expect(response.statusCode).toBe(200);
    
        // Create Date objects from the date part of the timestamps
        const receivedDate = new Date(response.body.appointment_date.split('T')[0]);
        const expectedDate = new Date(newAppointmentData.appointmentDate.toISOString().split('T')[0]);
    
        // Get the time difference in milliseconds
        const diff = Math.abs(receivedDate.getTime() - expectedDate.getTime());
    
        // Check that the difference is less than one day
        expect(diff).toBeLessThanOrEqual(24 * 60 * 60 * 1000);
    });
    
    test('should respond to the DELETE method', async () => {
        const response = await request(app).delete(`/api/appointments/${testAppointment.id}`);
        expect(response.statusCode).toBe(200);
        // After deleting, we should get an error if we try to get the appointment again
        await new Promise(resolve => setTimeout(resolve, 500));  
        const getResponse = await request(app).get(`/api/appointments/${testAppointment.id}`);
        expect(getResponse.statusCode).toBe(404);
    });   
});