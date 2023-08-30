const express = require('express');
const app = express();
const {testimonials, concerts, seats} = require('./db');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.listen(8000, () => {
    console.log('Server is running on port 8000')
})

// Testimonials
app.get('/testimonials', (req, res) => {
    res.json(testimonials);
}) 
app.get('/testimonials/randomTwo', (req, res) => {
    const randomIndex = Math.floor(testimonials.length * Math.random())
    res.json(testimonials[randomIndex]);
})
app.get('/testimonials/:id', (req, res) => {

    const testimonial = testimonial.find(t => t.id === parseInt(req.params.id));
    res.json(testimonial);
})
app.post('/testimonials', (req, res) => {
    const { author, text} = req.body;
    res.json({author, text, message: 'OK' })
})
app.put('/testimonials/:id', (req, res) => {
    const testimonial = testimonial.find(t => t.id === parseInt (req.params.id));

    if (!testimonial) {
        return res.status(404).send('Testimonial with a given ID was not found')
    }

    testimonial.author = req.body.author;
    testimonial.text = req.body.text;

    res.send({ message: 'OK' })
})
app.delete('/testimonials/:id', (req, res) => {
    const index = testimonials.findIndex(t => t.id === parseInt (req.params.id));

    if (index === -1) {
        return res.status(404).send({ message: 'Testimonial with the given ID was not found.' });
    }

    const leftTestimonial = testimonials.splice(index, 1);

    res.send({leftTestimonial, message: 'OK'})
})

// Concert

app.get('/concerts', (req, res) => {
    res.json(concerts)
})

app.get('/concerts/:id', (req, res) => {
    const concert = concerts.find(f => f.id === req.params.id)

    res.json(concert);
})

app.post('/concerts', (req, res) => {
    const { author, text } = req.body
    res.json({author, text, message: 'ok'})
})

app.put('/concerts', (req, res) => {
    const concert = concerts.find(c => c.id === req.params.id)

    if (!concert) {
        return res.status(404).send({message: 'Concert with the givern ID was not found'})
    }

    concert.author = req.body.author
    concert.text = req.body.text

    res.send({message: 'OK'})

})

app.delete('/concerts/:id', (req, res) => {
    const index = concerts.findIndex(c => c.id === req.params.id)

    if (index === -1) {
        return res.status(404).send({message: 'Concert with given ID was not found'})
    }
    const leftConcerts = seats.splice(index, 1)

    res.json({messgae: ok, leftConcerts})
})


// Seats

app.get('/seats', (req, res) => {
    res.json(seats)
})

app.get('/seats/:id', (req, res) => {
    const seat = seats.find(s => s.id === parseInt(req.params.id))
    res.json(seat)
})

app.post('/seats', (req, res) => {
    const {author, text} = req.body;
    res.json( {author, text})
})

app.put('/seats/:id', (req, res) => {
    const seat = seats.find( s => s.id === parseInt(req.params.id))

    if (!seat) {
        return res.status(404).send({ message: 'Seat with the given ID was not found'})
    }

    seat.author = req.body.author
    seat.text = req.body.text

    res.send({message: 'OK'})
})

app.delete('/seats/:id', (req, res) => {
    const index = seats.findIndex( s => s.id === parseInt(req.params.id))

    if (index === -1) {
        return res.status(404).send({ message: 'Seat with given ID was not found'})
    }

    const leftSeat = seats.splice(index, 1)

    res.send({message: OK, leftSeat})

})





app.use((req, res) => {
  res.status(404).send('404 not found...');
})

