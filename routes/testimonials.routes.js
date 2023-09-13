const express = require('express')
const router = express.Router();

const Testimonials = require('../models/testimonials.models')


router.get('/testimonials', async (req, res) => {
    try {
        res.json( await Testimonials.find())
    }
    catch(err) {
        res.status(500).json( {message: err})
    }

}) 
router.get('/testimonials/randomTwo', async (req, res) => {
    try {
        const count = await Testimonials.countDocuments();
        const random = Math.floor(Math.random() * count)
        const testi = await Testimonials.findById(random)
        if(!testi)res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    }
    catch(err) {
        res.status(500).json( { message: 'OK' })
    }
})

router.get('/testimonials/:id', async (req, res) => {
    try {
        const testimonial = await Testimonials.findById(req.params.id)
        if(!testimonial) res.status(404).json( { message: 'Not found'})
        else res.json(testimonial)
    }
    catch(err) {
        res.status(500).json({ message: err })
    }
})


router.post('/testimonials', async (req, res) => {
    try {
        const { author, text} = req.body;
        const newTestimonial = new Testimonials({author:author, text: text});
        await newTestimonial.save()
        res.json({ message: 'OK'})

    }
    catch(err) {
        res.status(500).json({ message: err })
    }
})


router.put('/testimonials/:id', async (req, res) => {
    try {
        const { author, text} = req.body;
        const updateTesti = await Testimonials.findById(req.params.id)
        if(!updateTesti) res.status(404).json({ messsage: 'Not found'})
        else {
            await Testimonials.updateOne({ _id: req.params.id}, {$set: { author: author, text: text}})
            res.json({ message: "OK"})
        }

    } 
    catch(err) {
        res.status(500).json({ message: err })
    }
})


router.delete('/testimonials/:id', async (req, res) => {
    try {
        const deleteTesti = await Testimonials.findById(req.params.id)
        if(!deleteTesti) res.status(404).json({ message: 'Not found'})
        else {
            await seats.deleteOne({_id: req.params.id})
        }

    }
    catch(err) {
        res.status(500).json({ message: err })
    }
})


module.exports = router;