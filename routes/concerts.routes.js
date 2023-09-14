const express = require('express')
const router = express.Router();

const ConcertController = require('../controllers/concert.controller')

// Concert

router.get('/concerts', ConcertController.getAll  )

router.get('/concerts/:id', ConcertController.getAllById )

router.post('/concerts', ConcertController.postById )

router.put('/concerts/:id', ConcertController.putById)

router.delete('/concerts/:id', ConcertController.deleteById)

module.exports = router;