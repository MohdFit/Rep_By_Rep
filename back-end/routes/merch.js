const { addTShirt, toggleAllTShirts, updateTShirt,deleteTShirt } = require('../controllers/merch/merchController')
const { getAllTShirts, getTShirtById, getActiveTShirts, getAvailableOptions , searchTShirts} = require('../controllers/merch/getController')
const { authMiddleware , requireRole } = require('../middleware/authMiddleware');



const express = require('express');
const router = express.Router();


router.post('/merch/add',authMiddleware,requireRole(['admin']), addTShirt); //  POST /api/merch
router.post('/toggleShirts', toggleAllTShirts); // POST /api/toggleShirts

router.put('/tshirts/:id',authMiddleware,requireRole(['admin']), updateTShirt); // PUT /api/tshirts/:id
router.delete('/tshirts/:id',authMiddleware,requireRole(['admin']), deleteTShirt); // DELETE /api/tshirts/:id

router.get('/tshirts', getAllTShirts);
router.get('/tshirt/:id', getTShirtById);


router.get('/tshirts/active', getActiveTShirts);
router.get('/tshirts/options', getAvailableOptions);
router.get('/tshirts/search',searchTShirts)



module.exports = router;