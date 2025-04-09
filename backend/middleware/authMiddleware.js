const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token = req.headers.authorization;
  // console.log(token);
  if (token && token.startsWith("Bearer")) {
    try {
      const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized, token failed" });
    } 
  } else {
    res.status(401).json({ message: "Unauthorized, no token" });
  }
};

// user based access

exports.isFarmer = async (req, res, next) => {
  // console.log(req.params);
  const user = await User.findById(req.user.id);
  if (user.role === "farmer") {
      next();
  } else {
      res.status(403).json({ message: "Access denied. Only farmers can access this." });
  }
};

exports.isWarehouseOwner = async (req, res, next) => {
  // console.log(req);
  const user = await User.findById(req.user.id);
  // console.log(req.user);
  if (user.role === "warehouseOwner") {
      next();
  } else {
      res.status(403).json({ message: "Access denied. Only warehouse owners can access this." });
  }
};
