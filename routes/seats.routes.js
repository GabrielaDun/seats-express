const express = require('express')
const router = express.Router();
const db = require('./../db');
const seats = db.seats;

// Seats

router.route('/seats').get((req, res) => {
    res.json(seats)
});

router.route('/seats/:id').get((req, res) => {
    const seat = seats.find(s => s.id === parseInt(req.params.id))
    res.json(seat)
})

router.route('/seats').post((req, res) => {
    const {day, seat, client, email} = req.body;
    
    const seatsBusy = seats.some(item => item.seat == seat && item.day == day);

    if (seatsBusy) {
        return res.status(404).send({ message: 'Seat with the given ID is already taken' })
    } else {
        seats.push({ day, seat, client, email})
    req.io.emit('seatsUpdated', db.seats);
    res.json( {day, seat, client, email})
    }
    
})

router.route('/seats/:id').put((req, res) => {
    const seat = seats.find( s => s.id === parseInt(req.params.id))

    if (!seat) {
        return res.status(404).send({ message: 'Seat with the given ID was not found'})
    }

    seat.day = req.body.day
    seat.seat = req.body.seat
    seat.client = req.body.client
    seat.email = req.body.email

    res.send({message: 'OK'})
})

router.route('/seats/:id').delete((req, res) => {
    const index = seats.findIndex( s => s.id === parseInt(req.params.id))

    if (index === -1) {
        return res.status(404).send({ message: 'Seat with given ID was not found'})
    }

    const leftSeat = seats.splice(index, 1)

    res.send({message: 'OK', leftSeat})

})

module.exports = router;