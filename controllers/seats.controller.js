const Seats = require('../models/seats.models')

exports.getAll = async (req, res) => {
    try {
        res.json(await Seats.find())
    }
    catch(err) {
        res.status(500).json({ message: err })
    }
}

exports.getById = async (req, res) => {
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
}

exports.postById = async (req, res) => {
    try {
        const {day, seat, client, email} = req.body;
        const newSeat = new Seats({ day: day, seat: seat, client: client, email: email})
        await newSeat.save();
        res.json({ message: 'OK'})

    }
    catch(err) {
        res.status(500).json({ message: err })
    }
    
}

exports.putById = async (req, res) => {
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
}

exports.deleteById = async (req, res) => {
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

}