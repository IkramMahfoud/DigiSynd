const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');



const addPayment = async (req, res) => {
  try {
    const { apartement, month } = req.body;

    const data = {
      apartement,
      month
    };

    const payment = await Payment.create(data);
    res.status(201).json(payment);

  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};



const getPaymentByApparId = async (req, res) => {
  try {
    const { id } = req.params;

    const payments = await Payment.find({ apartement : id });
    res.status(200).json(payments);

  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};



const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the payment exists before attempting to delete
    const deletedPayment = await Payment.findById(id);
    if (!deletedPayment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    await Payment.findByIdAndDelete(id);

    if (deletedPayment) {
      res.status(200).json({ message: 'Payment deleted successfully' });
    } else {
      res.status(404).json({ message: 'Payment not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};



module.exports = { addPayment , deletePayment ,getPaymentByApparId};
