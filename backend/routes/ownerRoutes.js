const express = require('express')
const router = express.Router()
const {  addOwner , getAllOwners ,deleteOwner} = require('../controllers/ownerController');


router.post('/add', addOwner);
router.get('/getall', getAllOwners);
router.delete('/delete/:id', deleteOwner);


module.exports = router;