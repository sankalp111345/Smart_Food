const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs'); // Ensure this import is present


const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

exports.registerUser = async (req, res) => {
  // console.log(req);
  const { name, email, password, role } = req.body;

  try {
    if (!["farmer", "warehouseOwner"].includes(role)) {
      return res.status(400).json({ message: "Invalid role selected." });
    }
    
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });
    

    const user = await User.create({ name, email, password, role });
    res.status(201).json({ _id: user.id, name: user.name, email: user.email, role: user.role, token: generateToken(user.id, user.role) });
  } catch (error) {
    console.log(role);
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    res.status(200).json({ _id: user.id, name: user.name, email: user.email, role: user.role, token: generateToken(user.id) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
