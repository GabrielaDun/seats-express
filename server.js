const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.listen(8000, () => {
    console.log('Server is running on port 8000')
})


app.get('/testimonials', (req, res) => {
    res.render(db);
}) 

app.get('/testimonialas/:id', (req, res) => {
    res.json({id: req.params.id });
})

app.get('/testimonials/random', (req, res) => {
    const randomIndex = Math.floor(db.length * Math.random())
    res.json(db[randomIndex]);
})

app.post('/testimonials', (req, res) => {
    const { author, text} = req.body;
    res.json({author, text})
})

app.put('/testimonials/:id', (req, res) => {

})

