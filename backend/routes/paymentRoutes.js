const express = require('express')
const router = express.Router()
const { addPayment , deletePayment , getPaymentByApparId} = require('../controllers/PaymentController');


router.post('/add', addPayment);
router.get('/getbyapartement/:id', getPaymentByApparId);
router.delete('/delete/:id', deletePayment);

module.exports = router;