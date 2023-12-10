const express = require('express')
const router = express.Router()
const { addApartment,
        getApartments,
        getApartment,
        deleteApartment,
        updateApartment
      } = require('../controllers/apartmentController');


router.post('/add', addApartment);
router.get('/getOne/:id', getApartment);
router.get('/getAll', getApartments);
router.put('/update/:id', updateApartment);
router.delete('/delete/:id', deleteApartment); 


module.exports = router;