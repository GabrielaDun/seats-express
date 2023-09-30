const express = require('express')
const router = express.Router();

const ConcertController = require('../controllers/concert.controller')

// Concert

router.get('/concerts', ConcertController.getAll  )

router.get('/concerts/:id', ConcertController.getAllById )

router.post('/concerts', ConcertController.postById )

router.put('/concerts/:id', ConcertController.putById)

router.delete('/concerts/:id', ConcertController.deleteById)

/// New
router.get('/concert/performer/:performer', ConcertController.getConcertByPerformer)

router.get('/concert/genre/:genre', ConcertController.getConcertByGenre)

router.get('/concert/price/day/:day', ConcertController.getConcertByDay)
/
router.get('concert/price/:price_min/:price_max', ConcertController.getConcertByPriceRange)

module.exports = router;