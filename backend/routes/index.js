const express = require('express')
const router = express.Router()
const syndicRouter = require('./syndicRoutes')
const apartementRouter = require('./apartmentRoutes')
const ownerRouter = require('./ownerRoutes')
const paymentRouter = require('./paymentRoutes')


router.use('/api/syndic', syndicRouter)
router.use('/api/owner', ownerRouter)
router.use('/api/apartement', apartementRouter)
router.use('/api/payment', paymentRouter)

module.exports = router