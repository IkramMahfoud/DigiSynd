const express = require('express')
const router = express.Router()
const { addApartment,
  getApartments,
  getApartment,
  deleteApartment,
  updateApartment
} = require('../controllers/apartmentController');
const { authMiddleware } = require('../middlewares/authMiddleware')


router.post('/add', addApartment);
router.get('/getOne/:id',authMiddleware, getApartment);
router.get('/getAll',authMiddleware, getApartments);
router.put('/update/:id', authMiddleware,updateApartment);
router.delete('/delete/:id', authMiddleware,deleteApartment);


module.exports = router;