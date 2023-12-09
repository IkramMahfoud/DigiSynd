const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const Syndic = require('../models/Syndic')


// this it works for once !
// @desc  Register a new Syndic
// @route POST /api/register
// @access Public

const register = asyncHandler(async (req, res) =>
{
  const { fullname, email, password } = req.body
  if (!fullname || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  //check if syndic exist
  const syndicExists = await Syndic.findOne({ email })
  if (syndicExists) {
    res.status(400)
    throw new Error('Syndic Already Exists')
  }

  // hashing password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // create the syndic
  const syndic = await Syndic.create({
    fullname,
    email,
    password: hashedPassword, // Assuming i've hashed the password
  });

  // check if created
  if (syndic) {
    res.status(201).json({
      _id: syndic.id,
      fullname: syndic.fullname,
      email: syndic.email,
      token: generateToken(syndic._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid Syndic Data')
  }
});



// @desc  Authenticate a Syndic
// @route POST /api/login
// @access Public
const login = asyncHandler(async (req, res) =>
{
  const { email, password } = req.body;

  const syndic = await Syndic.findOne({ email })
  if (syndic && (await bcrypt.compare(password, syndic.password))) {
    res.json({
      _id: syndic.id,
      fullname: syndic.fullname,
      email: syndic.email,
      token: generateToken(syndic._id),
      message : "Syndic Authenticated 😍"
    })
  } else {
    res.status(400)
    throw new Error('Invalid Credentials')
  }
});



// Generate Token
const generateToken = (id) =>
{
  // token payload
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}


module.exports = {
  register,
  login
}