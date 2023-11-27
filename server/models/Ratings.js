import mongoose from 'mongoose';

/**
 * The RatingSchema defines the shape of the ratings that will be stored in the database.
 */
const RatingSchema = new mongoose.Schema({
	productID: {
		type: Number,
		required: true,
	},
	rating: {
		type: Number,
		required: true,
	},
	userID: {
		type: String,
		required: true,
	},
});

const RatingModel = mongoose.model('ratings', RatingSchema);
export default RatingModel;
