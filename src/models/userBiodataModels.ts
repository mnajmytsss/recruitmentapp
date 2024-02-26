import mongoose from "mongoose";

const userBiodataSchema = new mongoose.Schema({
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
  },
  picture: {
    type: String,
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

const UserBiodataSchema = mongoose.models.userBiodata || mongoose.model("userBiodata", userBiodataSchema);

export default UserBiodataSchema;
