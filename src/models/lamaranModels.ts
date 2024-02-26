import mongoose from "mongoose";

const lamaranSchema = new mongoose.Schema({
  email: {
    type: String,
    ref: "UserAccount",
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pekerjaan",
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: [
      "pending",
      "interview_hr",
      "interview_user",
      "offering",
      "rejected",
      "not_continued",
    ],
    default: "pending",
  },
});

const Lamaran =
  mongoose.models.Lamaran || mongoose.model("Lamaran", lamaranSchema);

export default Lamaran;
