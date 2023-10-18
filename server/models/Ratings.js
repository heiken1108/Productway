const mongoose = require('mongoose')
//const ProductModel = require('./products')


const RatingSchema = new mongoose.Schema({
    productID: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    userID: {
        type: Number,
        required: true
    }
})

const RatingModel = mongoose.model("ratings", RatingSchema)
module.exports = RatingModel
