// Requires
const express = require('express');
const appointmentsRouter = express.Router();
const { 
    createAppointment, 
    getAllAppointments, 
    getAppointmentById, 
    updateAppointment, 
    deleteAppointment 
} = require('../db/appointments');

// Endpoint to get all appointments
appointmentsRouter.get('/', async (req, res, next) => {
    try {
        const appointments = await getAllAppointments();
        res.send(appointments);
    } catch (error) {
        next(error);
    }
});

// Endpoint to get an appointment by id
appointmentsRouter.get('/:id', async (req, res, next) => {
    try {
        const appointment = await getAppointmentById(req.params.id);
        res.send(appointment);
    } catch (error) {
        next(error);
    }
});

// Endpoint to create a new appointment
appointmentsRouter.post('/', async (req, res, next) => {
    try {
        const appointment = await createAppointment(req.body);
        res.send(appointment);
    } catch (error) {
        next(error);
    }
});

// Endpoint to update an appointment
appointmentsRouter.patch('/:id', async (req, res, next) => {
    try {
        const updatedAppointment = await updateAppointment({ id: req.params.id, ...req.body });
        res.send(updatedAppointment);
    } catch (error) {
        next(error);
    }
});

// Endpoint to delete an appointment
appointmentsRouter.delete('/:id', async (req, res, next) => {
    try {
        await deleteAppointment(req.params.id);
        res.send({ message: 'Appointment deleted.' });
    } catch (error) {
        next(error);
    }
});

module.exports = {
    appointmentsRouter
};