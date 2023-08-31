const express = require('express')
const router = express.Router();
const concerts = require('./../db');


// Concert

router.route('/concerts').get((req, res) => {
    res.json(concerts)
})

router.route('/concerts/:id').get((req, res) => {
    const concert = concerts.find(f => f.id === req.params.id)
    res.json(concert);
})

router.route('/concerts').post((req, res) => {
    const { author, text } = req.body
    res.json({author, text, message: 'ok'})
})

router.route('/concerts').put((req, res) => {
    const concert = concerts.find(c => c.id === req.params.id)

    if (!concert) {
        return res.status(404).send({message: 'Concert with the givern ID was not found'})
    }

    concert.author = req.body.author
    concert.text = req.body.text

    res.send({message: 'OK'})

})

router.route('/concerts/:id').delete((req, res) => {
    const index = concerts.findIndex(c => c.id === req.params.id)

    if (index === -1) {
        return res.status(404).send({message: 'Concert with given ID was not found'})
    }
    const leftConcerts = seats.splice(index, 1)

    res.json({messgae: ok, leftConcerts})
})


module.exports = router;