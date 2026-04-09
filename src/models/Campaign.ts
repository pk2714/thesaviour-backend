import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  contractId: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  goalAmount: { type: String, required: true },
  owner: { type: String, required: true }, // wallet address
  ownerEmail: { type: String }, // email for notifications
  ownerName: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Campaign", campaignSchema);