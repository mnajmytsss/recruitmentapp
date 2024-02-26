import mongoose from "mongoose";

const { Schema } = mongoose;

const userAccountSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  picture: {
    type: String,
  },
  biodata: {
    bio: {
      type: String,
    },
    alamat: {
      type: String,
    },
    pendidikan: {
      type: String,
    },
    pengalamanKerja: {
      type: String,
    },
    cv: {
      type: String,
    },
    suratLamaran: {
      type: String,
    },
    portfolio: {
      type: String,
    }
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const UserAccount = mongoose.models.userAccount || mongoose.model("userAccount", userAccountSchema);

export default UserAccount;
