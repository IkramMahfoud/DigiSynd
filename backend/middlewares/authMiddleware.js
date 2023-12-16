const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Syndic = require('../models/Syndic')

const authMiddleware = asyncHandler(async (req, res, next)=>{
  let token

  // this will be sent with headers as an authorization object
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      req.syndic = await Syndic.findById(decoded.id).select('-password')

      next()

    } catch (error) {
      console.log(error);
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if(!token){
    res.status(401)
    throw new Error('Not authorized , no token')
  }
})

module.exports = {authMiddleware}