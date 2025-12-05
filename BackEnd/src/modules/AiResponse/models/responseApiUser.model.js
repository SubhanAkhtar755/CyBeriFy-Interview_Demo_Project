import mongoose from "mongoose";


const ResponseApiUserSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    model: { type: String, required: false }, // add this
  },
  { timestamps: true }
);
export default mongoose.model("ResponseApiUser", ResponseApiUserSchema);
