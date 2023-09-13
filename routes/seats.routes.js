const express = require('express')
const router = express.Router();

const Seats = require('../models/seats.models');

// Seats

router.get('/seats', async (req, res) => {
    try {
        res.json(await Seats.find())
    }
    catch(err) {
        res.status(500).json({ message: err })
    }
});

router.get('/seats/:id', async (req, res) => {
    try {
        const seatsById = await Seats.findById(req.params.id);
        if (!seatsById) res.status(404).json({ message: 'Not found'})
        else {
            res.json(seatsById)
        }
    }
    catch (err) {
        res.status(500).json( { message: err})
    }
})

router.post('/seats', async (req, res) => {
    try {
        const {day, seat, client, email} = req.body;
        const newSeat = new Seats({ day: day, seat: seat, client: client, email: email})
        await newSeat.save();
        res.json({ message: 'OK'})

    }
    catch(err) {
        res.status(500).json({ message: err })
    }
    
})

router.put('/seats/:id', async (req, res) => {
    try {
        const { day, seat, client, email } = req.body;
        const editedSeat = await Seats.findById(req.params.id)
        if(!editedSeat) res.status(404).json({ message: 'Not found'})
        else {
            await Seats.updateOne({_id: req.params.id }, {$set: {day:day, seat:seat, client: client, email:email } })
            res.json({message: 'OK'})
        }
    }
    catch(err) {
        res.status(500).json({ message: err})
    }


})

router.delete('/seats/:id', async (req, res) => {
    try {
        const deleteSeat = await Seats.findById(req.params.id)
        if(!deleteSeat) res.status(404).json({ message: 'Not found'})
        else {
            await Seats.deleteOne( {_id: req.params.id} )
            res.json({ message: 'OK'})
        }
    }
    catch(err) {
        res.status(500).json( { message: err})
    }

})

module.exports = router;