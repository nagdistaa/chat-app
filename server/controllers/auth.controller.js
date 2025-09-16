import bcrypt from "bcryptjs";
import sendWelcomeMail from "../Emails/emailHandlers.js";
import User from "../models/User.model.js";
import generateToken from "../utils/token.js";

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

    await newUser.save();
    generateToken(newUser._id, res);

    try {
      await sendWelcomeMail(
        "nagdista@gmail.com",
        newUser.fullName,
        process.env.CLIENT_URL
      );
    } catch (error) {
      console.log("from sending email in the signup:", error);
    }

    return res.status(201).json({
      success: true,
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.log("Error in signup");
    res.status(500).json({ success: false, message: error.message });
  }
};

// !Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "invalid email or password" });
    }
    const isCorrectPass = await bcrypt.compare(password, user.password);
    if (!isCorrectPass) {
      return res
        .status(400)
        .json({ success: false, message: "invalid email or password" });
    }

    generateToken(user._id, res);
    res
      .status(400)
      .json({ success: true, _id: user._id, fullName: user.fullName });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
}; // !Logout
export const logout = async (_, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ success: true, message: "logged out successfully" });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};
