const express = require('express')
const router = express.Router()
const syndicRouter = require('./syndicRoutes')
const apartementRouter = require('./apartmentRoutes')
const ownerRouter = require('./ownerRoutes')


router.use('/api/syndic', syndicRouter)
router.use('/api/owner', ownerRouter)
router.use('/api/apartement', apartementRouter)

module.exports = router