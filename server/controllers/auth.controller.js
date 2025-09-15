import User from "../models/User.model.js";
import generateToken from "../utils/token.js";
import bcrypt from 'bcryptjs'
// !Signup
export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "password must be at least 6 character",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "invalid email format",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Email already exists try another email",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = new User({ fullName, email, password: hashedPass });
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      return res.status(201).json({
        success: true,
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user date" });
    }
    // !TODO send welcome email to user
  } catch (error) {
    console.log("Error in signup");
    res.status(401).json({ success: false, message: error.message });
  }
};
// !Login
export const login = async (req, res) => {
  try {
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
}; // !Logout
export const logout = async (req, res) => {
  try {
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};
