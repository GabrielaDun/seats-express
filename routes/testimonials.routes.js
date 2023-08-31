const express = require('express')
const router = express.Router();
const db = require('./../db');
const testimonials = db.testimonials

// Testimonials
router.route('/testimonials').get((req, res) => {
    res.json(testimonials);
}) 
router.route('/testimonials/randomTwo').get((req, res) => {
    const randomIndex = Math.floor(testimonials.length * Math.random())
    res.json(testimonials[randomIndex]);
})
router.route('/testimonials/:id').get((req, res) => {

    const testimonial = testimonial.find(t => t.id === parseInt(req.params.id));
    res.json(testimonial);
})
router.route('/testimonials').post((req, res) => {
    const { author, text} = req.body;
    res.json({author, text, message: 'OK' })
})
router.route('/testimonials/:id').put((req, res) => {
    const testimonial = testimonial.find(t => t.id === parseInt (req.params.id));

    if (!testimonial) {
        return res.status(404).send('Testimonial with a given ID was not found')
    }

    testimonial.author = req.body.author;
    testimonial.text = req.body.text;

    res.send({ message: 'OK' })
})
router.route('/testimonials/:id').delete((req, res) => {
    const index = testimonials.findIndex(t => t.id === parseInt (req.params.id));

    if (index === -1) {
        return res.status(404).send({ message: 'Testimonial with the given ID was not found.' });
    }

    const leftTestimonial = testimonials.splice(index, 1);

    res.send({leftTestimonial, message: 'OK'})
})


module.exports = router;