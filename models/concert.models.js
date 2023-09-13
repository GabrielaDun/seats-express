const mongoose = require('mongoose')

const concertSchema = new mongoose.Schema( {
    performer: { type: String, required: true },
    genre: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }

})

modele.exports = mongoose.model('Concerts', concertSchema);