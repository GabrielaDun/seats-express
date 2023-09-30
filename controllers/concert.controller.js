const Concerts = require('../models/concert.models')
const Seats = require('../models/seats.models')

exports.getAll = async (req, res) => {
    try {
        const concerts = await Concerts.find()
        const updateConcerts = await Promise.all(concerts.map(async (concert) => {
            const bookingConut = await Seats.find({ day: concert.day});
            const seatsAvaliable = 50 - bookingConut.length;

            concert = concert.toObject();
            concert.tickets = seatsAvaliable

            return concert
        }))
        res.json(updateConcerts)
    }
    catch(err) {
        res.status(500).json({ message: err })
    }
}

exports.getAllById = async (req, res) => {
    try {
        const concert = await Concerts.findById(req.params.id);
        if(!concert) res.status(404).json( { message: 'Not found' });
        else res.json(concert);
        
    } catch(err) {
        res.status(500).json({ message: err })
    }
}

exports.postById =  async (req, res) => {
    try {
        const { performer, genre, price, day, image } = req.body;
        const newConcert = new Concerts({ performer: performer, genre: genre, price:price, day:day, image:image})
        await newConcert.save()
        res.json( { message: 'OK'})
    } 
    catch(err) {
        res.status(500).json( { message: err})
    }
}

exports.putById = async (req, res) => {
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

}

exports.deleteById = async (req, res) => {
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
}

exports.getConcertByPerformer = async (req,res) => {
    try {
        const concert = await Concerts.find({ performer: req.params.performer })
        if(!concert) res.status(404).json( { message: 'Not found' });
        else res.json(concert);
    }
    catch(err) {
        res.status(500).json( { message: err })
    }
}

exports.getConcertByGenre = async (req,res) => {
    try {
        const concert = await Concerts.find({ genre: req.params.genre })
        if(!concert) res.status(404).json( { message: 'Not found' });
        else res.json(concert);
    }
    catch(err) {
        res.status(500).json( { message: err })
    }
}

exports.getConcertByDay = async (req,res) => {
    try {
        const concert = await Concerts.find({ day: req.params.day })
        if(!concert) res.status(404).json( { message: 'Not found' });
        else res.json(concert);
    }
    catch(err) {
        res.status(500).json( { message: err })
    }
}


exports.getConcertByPriceRange = async (req,res) => {
    const { price_min, price_max } = req.params;
    if (isNaN(price_min) || isNaN(price_max)){
        return res.status(400).json({ message: 'Invalid price range' })
    }
    try {
        const concert = await Concerts.find({ price: { $gte: Number(price_min), $lte: Number(price_max)} })
        if(!concert ) res.status(404).json( { message: 'Not found' });
        else res.json(concert);
    }
    catch(err) {
        res.status(500).json( { message: err })
    }
}