const express = require('express')
const router = express.Router()

const syndicRouter = require('./syndicRoutes')
router.use('/api/syndic', syndicRouter)

module.exports = router