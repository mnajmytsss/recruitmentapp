import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
    },
    pendidikan: {
        type: String,
    },
    pengalamanKerja: {
        type: String
    },
    cv: {
        type: String
    },
    suratLamaran: {
        type: String
    },
    avatar: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
})

const User = mongoose.models.users || mongoose.model("userProfile", userSchema);

export default User;