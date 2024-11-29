
import mongoose from "mongoose";

// const mongoose= require("mongoose");
const Schema1= mongoose.Schema;

const UserSchema = new Schema1({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    bookings: [{
        type: mongoose.Schema.Types.ObjectId, // Correct usage of ObjectId
        ref: 'bookings'  // Ensure this matches the model name you used for bookings
    }]
});
const UserModel = mongoose?.models?.User || mongoose.model('User', UserSchema);


export default UserModel;
