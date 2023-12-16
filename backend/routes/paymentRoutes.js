const express = require('express')
const router = express.Router()
const { addPayment , deletePayment , getPaymentByApparId} = require('../controllers/PaymentController');
const { authMiddleware } = require ('../middlewares/authMiddleware')


router.post('/add', authMiddleware, addPayment);
router.get('/getbyapartement/:id', authMiddleware, getPaymentByApparId);
router.delete('/delete/:id', authMiddleware, deletePayment);

module.exports = router;