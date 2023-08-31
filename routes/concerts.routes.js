const express = require('express')
const router = express.Router();
const db = require('./../db');
const concerts = db.concerts;

// Concert

router.route('/concerts').get((req, res) => {
    res.json(concerts)
})

router.route('/concerts/:id').get((req, res) => {
    const concert = concerts.find(f => f.id === req.params.id)
    res.json(concert);
})

router.route('/concerts').post((req, res) => {
    const { performer, genre, price, day, image } = req.body
    res.json({performer, genre, price, day, image, massage : 'ok'})
})

router.route('/concerts').put((req, res) => {
    const concert = concerts.find(c => c.id === req.params.id)

    if (!concert) {
        return res.status(404).send({message: 'Concert with the givern ID was not found'})
    }

    concert.performer = req.body.performer
    concert.genre = req.body.genre
    concert.price = req.body.price
    concert.day = req.body.day
    concert.image = req.body.image

    res.send({message: 'OK'})

})

router.route('/concerts/:id').delete((req, res) => {
    const index = concerts.findIndex(c => c.id === req.params.id)

    if (index === -1) {
        return res.status(404).send({message: 'Concert with given ID was not found'})
    }
    const leftConcerts = seats.splice(index, 1)

    res.json({messgae: 'ok', leftConcerts})
})


module.exports = router;