import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    isAdmin: { type: String, default: false },
},
    { timestamps: true }

)

const User = mongoose.models.User || mongoose.model('User', userSchema, 'User')
export default User;