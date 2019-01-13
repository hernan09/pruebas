const mongoose = require('mongoose')
const Squema = mongoose.Schema

let producto = new Squema({
    name: { type: String },
    price: { type: Number, default: 0 }

})


module.exports = mongoose.model('producto', producto)