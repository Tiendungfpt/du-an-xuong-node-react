import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        minlength: 3,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

export default mongoose.model('User', userSchema);