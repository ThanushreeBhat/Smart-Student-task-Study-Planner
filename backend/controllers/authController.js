import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({ ...req.body, password: hashed });
  res.json(user);
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json("User not found");

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) return res.status(400).json("Wrong password");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret");

  // Streak logic
  const now = new Date();
  const last = user.lastLogin ? new Date(user.lastLogin) : null;
  
  if (last) {
    const diff = Math.floor((now - last) / (1000 * 60 * 60 * 24));
    if (diff === 1) {
      user.streak += 1;
    } else if (diff > 1) {
      user.streak = 1;
    }
  } else {
    user.streak = 1;
  }
  
  user.lastLogin = now;
  await user.save();

  res.json({ token, streak: user.streak });
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body;
    const user = await User.findById(req.user.id);
    
    if (name) user.name = name;
    if (email) user.email = email;
    if (profileImage) user.profileImage = profileImage;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    
    await user.save();
    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(400).json(err.message);
  }
};