import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  profileImage: String,
  streak: { type: Number, default: 0 },
  lastLogin: { type: Date }
});

export default mongoose.model("User", userSchema);