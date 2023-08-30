const express = require('express');
const app = express();
const db = require('./db');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.listen(8000, () => {
    console.log('Server is running on port 8000')
})


app.get('/testimonials', (req, res) => {
    res.json(db);
}) 

app.get('/testimonials/randomTwo', (req, res) => {
    const randomIndex = Math.floor(db.length * Math.random())
    res.json(db[randomIndex]);
})

app.get('/testimonials/:id', (req, res) => {

    const testimonial = db.find(t => t.id === parseInt(req.params.id));
    res.json(testimonial);
})

app.post('/testimonials', (req, res) => {
    const { author, text} = req.body;
    res.json({author, text, message: 'OK' })
})

app.put('/testimonials/:id', (req, res) => {
    const testimonial = db.find(t => t.id === parseInt (req.params.id));

    if (!testimonial) {
        return res.status(404).send('Testimonial with a given ID was not found')
    }

    testimonial.author = req.body.author;
    testimonial.text = req.body.text;

    res.send({ message: 'OK' })
})

app.delete('/testimonials/:id', (req, res) => {
    const index = db.findIndex(t => t.id === parseInt (req.params.id));

    if (index === -1) {
        return res.status(404).send({ message: 'Testimonial with the given ID was not found.' });
    }

    const leftTestimonial = db.splice(index, 1);

    res.send({leftTestimonial, message: 'OK'})
})


