const express = require("express");
const Address = require("../models/Address");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const { verifyToken } = require("../routes/auth");

const router = express.Router();

// Get All Address
router.get("/", verifyToken, async (req, res) => {
  try {
    const address = await Address.findAll();
    res.json(address);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// Get address by ID
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const address = await Address.findAll({ where: { AddressLine1: { [Op.like]: "%" + req.params.id + "%" } } });
    // const address = await Address.findByPk(req.params.id);
    if (!address) return res.status(404).json({ message: "Address not found" });
    res.json(address);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// Create a new address
router.post("/", verifyToken, async (req, res) => {
  try {
    const { CartID, AddressLine1, AddressLine2, City, State, ZipCode } = req.body;

    const address = await Address.create({
      CartID,
      AddressLine1,
      AddressLine2,
      City,
      State,
      ZipCode,
    });
    res.status(201).json(address);
  } catch (err) {
    console.error("Error inserting address", error);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// Update a address
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updated = await Address.update(req.body, { where: { AddressID: req.params.id } });
    if (updated[0] === 0) return res.status(404).json({ message: "Address not found" });
    const updatedAddress = await Address.findByPk(req.params.id);
    res.json(updatedAddress);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// Delete a address
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deleted = await Address.destroy({ where: { AddressID: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Address not found" });
    res.json({ message: "Address deleted" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

module.exports = router;
