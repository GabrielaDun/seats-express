const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const socket = require('socket.io')

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port 8000')
})
const io = socket(server)

app.use((req, res, next) => {
  req.io = io;
  next();
});


// import routes
const testimonialsRouter = require('./routes/testimonials.routes');
const concertsRouter = require('./routes/concerts.routes');
const seatsRouter = require('./routes/seats.routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', testimonialsRouter);
app.use('/api', concertsRouter);
app.use('/api', seatsRouter);

io.on('connection', () => {
  console.log('New socket!')
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));


app.use((req, res) => {
  res.status(404).send('404 not found...');
})


