const mongoose = require('mongoose');

const testimonialsSchama = new mongoose.Schema ( {
    author: { type: String, required: true },
    text: { type: String, required: true }
})

modele.exports = mongoose.model('Seat', testimonialsSchama)