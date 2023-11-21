import mongoose from 'mongoose';

/**
 * The UserSchema defines the shape of the users that will be stored in the database.
 */
const UserSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    favorites: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "products",
    },
    ratings: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "ratings",
    },
});

const UserModel = mongoose.model("users", UserSchema);
export default UserModel;
