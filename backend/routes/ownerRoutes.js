const express = require('express')
const router = express.Router()
const {  addOwner , getAllOwners ,deleteOwner} = require('../controllers/ownerController');
const { authMiddleware } = require ('../middlewares/authMiddleware')


router.post('/add', authMiddleware , addOwner);
router.get('/getall',authMiddleware, getAllOwners);
router.delete('/delete/:id',authMiddleware, deleteOwner);


module.exports = router;