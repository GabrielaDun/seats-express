const express = require('express')
const router = express.Router();

const Concerts = require('../models/concert.models')

// Concert

router.get('/concerts', async (req, res) => {
    try {
        res.json(await Concerts.find() )
    }
    catch(err) {
        res.status(500).json({ message: err })
    }
})

router.get('/concerts/:id', async (req, res) => {
    try {
        const concert = await Concerts.findById(req.params.id);
        if(!concert) res.status(404).json( { message: 'Not found' });
        else res.json(concert);
        
    } catch(err) {
        res.status(500).json({ message: err })
    }
})

router.post('/concerts', async (req, res) => {
    try {
        const { performer, genre, price, day, image } = req.body;
        const newConcert = new Concerts({ performer: performer, genre: genre, price:price, day:day, image:image})
        await newConcert.save()
        res.json( { message: 'OK'})
    } 
    catch(err) {
        res.status(500).json( { message: err})
    }
})

router.put('/concerts/:id', async (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    try {
        const changedConcert = await Concerts.findById(req.params.id);
        if (!changedConcert) res.status(404).json({ message: 'Not found'})
        else {
            await Concerts.updateOne({ _id: req.params.id }, {$set: {performer: performer, genre: genre, price: price, day: day, image: image}})
            res.json( { message: 'OK' })
        }
    }
    catch(err) {
        res.status(500).json({ message: err })
    }

})

router.delete('/concerts/:id', async (req, res) => {
    try {
        const deleteConcert = await Concerts.findById(req.params.id);
        if (!deleteConcert) res.status(404).json({ message: 'Not found'})
        else {
            await Concerts.deleteOne({_id: req.params.id})
            res.json( { message: 'OK' })
        }
    } 
    catch(err) {
        res.status(500).json( { message: err })
    }
})

