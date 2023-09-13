const express = require('express')
const router = express.Router();

const SeatsController = require('../controllers/seats.controller')

router.get('/seats', SeatsController.getAll);

router.get('/seats/:id', SeatsController.getById )

router.post('/seats', SeatsController.postById)

router.put('/seats/:id', SeatsController.putById)

router.delete('/seats/:id', SeatsController.deleteById )

module.exports = router;