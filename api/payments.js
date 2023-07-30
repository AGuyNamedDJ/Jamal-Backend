// Requires
const express = require('express');
const paymentsRouter = express.Router();
const { 
    createPayment, 
    getPaymentById, 
    getAllPayments, 
    updatePayment, 
    deletePayment 
} = require('../db/payments');

// createPayment
paymentsRouter.post('/', async (req, res, next) => {
    const payment = req.body;
    try {
        const newPayment = await createPayment(payment);
        res.status(201).json(newPayment);
    } catch (error) {
        next(error);
    }
});

// getAllPayments
paymentsRouter.get('/', async (req, res, next) => {
    try {
        const payments = await getAllPayments();
        res.json(payments);
    } catch (error) {
        next(error);
    }
});

// getPaymentById
paymentsRouter.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const payment = await getPaymentById(id);
        if (!payment) {
            return res.status(404).send("Payment not found");
        }
        res.json(payment);
    } catch (error) {
        next(error);
    }
});

// updatePayment
paymentsRouter.patch('/:id', async (req, res, next) => {
    const { id } = req.params;
    const payment = req.body;
    payment.id = id;  
    try {
        const updatedPayment = await updatePayment(payment);
        if (!updatedPayment) {
            return res.status(404).send("Payment not found");
        }
        res.json(updatedPayment);
    } catch (error) {
        next(error);
    }
});

// deletePayment
paymentsRouter.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        await deletePayment(id);
        res.status(204).send(); 
    } catch (error) {
        next(error);
    }
});

module.exports = {
    paymentsRouter
};