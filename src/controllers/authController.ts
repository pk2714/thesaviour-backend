import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { sendWelcomeEmail } from "../utils/emailService";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "7d" });
    
    // Email fail hone pe bhi registration hogi
    try {
      await sendWelcomeEmail(user.name, user.email);
    } catch (emailError) {
      console.error("Email error:", emailError);
    }

    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "7d" });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};