import mongoose from "mongoose";

const pekerjaanSchema = new mongoose.Schema({
  pekerjaan: {
    type: String,
    required: [true, "Pekerjaan is required"],
  },
  deskripsi: [
    {
      type: String,
      required: [true, "Deskripsi is required"],
    },
  ],
  kualifikasi: [
    {
      type: String,
      required: [true, "Kualifikasi is required"],
    },
  ],
  tanggungJawab: [
    {
      type: String,
      required: [true, "Tanggung Jawab is required"],
    },
  ],
  manfaat: [
    {
      type: String,
      required: [true, "Manfaat is required"],
    },
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Pekerjaan =
  mongoose.models.pekerjaan || mongoose.model("pekerjaan", pekerjaanSchema);
export default Pekerjaan;
