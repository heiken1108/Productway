const mongoose = require('mongoose');

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
module.exports = UserModel;