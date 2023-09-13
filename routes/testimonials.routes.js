const express = require('express')
const router = express.Router();

const TestimonialsController = require('../controllers/testimonials.controller')


router.get('/testimonials', TestimonialsController.getAll) 

router.get('/testimonials/randomTwo', TestimonialsController.getRandom)

router.get('/testimonials/:id', TestimonialsController.getById)


router.post('/testimonials', TestimonialsController.postById)


router.put('/testimonials/:id', TestimonialsController.putById)


router.delete('/testimonials/:id', TestimonialsController.deleteById)


module.exports = router;