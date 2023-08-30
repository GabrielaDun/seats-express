const express = require('express');
const app = express();

// import routes
const seatsRoutes = require('./routes/seats.routes')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', seatsRoutes);
app.use('/concerts')

app.listen(8000, () => {
    console.log('Server is running on port 8000')
})


app.use((req, res) => {
  res.status(404).send('404 not found...');
})

