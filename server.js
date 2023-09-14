const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const socket = require('socket.io')
const mongoose = require('mongoose')

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port 8000')
})
const io = socket(server)


// import routes
const testimonialsRouter = require('./routes/testimonials.routes');
const concertsRouter = require('./routes/concerts.routes');
const seatsRouter = require('./routes/seats.routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api', testimonialsRouter);
app.use('/api', concertsRouter);
app.use('/api', seatsRouter);


// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});


mongoose.connect('mongodb+srv://gabriela9889:o2o2o2Tlen@cluster1.f8rpjqw.mongodb.net/NewWaveDB?retryWrites=true&w=majority', { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
})
db.on('error', err => console.log('Error xbuiqs ' + err ));

io.on('connection', () => {
  console.log('New socket!')
})

app.use((req, res) => {
  res.status(404).send('404 not found...');
})


