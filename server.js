const express = require('express');
const app = express();
const cors = require('cors')
const seatsRoutes = require('./routes/seats.routes')

// import routes

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', seatsRoutes);

app.listen(8000, () => {
    console.log('Server is running on port 8000')
})


app.use((req, res) => {
  res.status(404).send('404 not found...');
})

