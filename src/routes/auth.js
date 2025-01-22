const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/Users");

const router = express.Router();

// Register user
router.post("/register", async (req, res) => {
  const { email, name, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await Users.create({ Email: email, Name: name, Password: hashedPassword });
  res.json({ message: "User berhasil didaftarkan" });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({
    where: { Email: email },
  });

  if (Object.keys(user).length === 0) {
    return res.status(404).json({ error: "User tidak ditemukan" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.Password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Password salah" });
  }

  const token = jwt.sign({ email: user.Email }, "secretKey", { expiresIn: "1h" });
  res.json({ message: "Login berhasil", token });
});

// Verifikasi jwt token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "Token diperlukan" });

  jwt.verify(token, "secretKey", (err, decoded) => {
    if (err) return res.status(401).json({ error: "Token tidak valid" });
    req.user = decoded;
    next();
  });
};

router.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "Profile user", user: req.user });
});

module.exports = {
  authRouter: router,
  verifyToken: verifyToken,
};
