const express = require('express')
const router = express.Router();
const seats = require('./db');

// Seats

router.route('/seats').get((req, res) => {
    res.json(seats)
});

router.route('/seats/:id').get((req, res) => {
    const seat = seats.find(s => s.id === parseInt(req.params.id))
    res.json(seat)
})

router.route('/seats').post((req, res) => {
    const {author, text} = req.body;
    res.json( {author, text})
})

router.route('/seats/:id').put((req, res) => {
    const seat = seats.find( s => s.id === parseInt(req.params.id))

    if (!seat) {
        return res.status(404).send({ message: 'Seat with the given ID was not found'})
    }

    seat.author = req.body.author
    seat.text = req.body.text

    res.send({message: 'OK'})
})

router.route('/seats/:id').delete((req, res) => {
    const index = seats.findIndex( s => s.id === parseInt(req.params.id))

    if (index === -1) {
        return res.status(404).send({ message: 'Seat with given ID was not found'})
    }

    const leftSeat = seats.splice(index, 1)

    res.send({message: OK, leftSeat})

})

module.exports = router;