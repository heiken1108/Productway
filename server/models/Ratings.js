import mongoose from 'mongoose';

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
        type: String,
        required: true
    }
});

const RatingModel = mongoose.model("ratings", RatingSchema);
export default RatingModel;
