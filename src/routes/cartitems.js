const express = require("express");
const CartItems = require("../models/CartItems");
const sequelize = require("sequelize");
const Op = sequelize.Op;

const router = express.Router();

// Get All Cart Item
router.get("/", async (req, res) => {
  try {
    const cartItems = await CartItems.findAll();
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// Get cart item by ID
router.get("/:id", async (req, res) => {
  try {
    const cartItem = await CartItems.findByPk(req.params.id);
    if (!cartItem) return res.status(404).json({ message: "Address not found" });
    res.json(cartItem);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// Create a new cart item
router.post("/", async (req, res) => {
  try {
    const { CartID, ProductID, Quantity } = req.body;

    const cekCartItem = await CartItems.findOne({
      where: {
        CartID: CartID,
        ProductID: ProductID,
      },
    });

    if (cekCartItem) {
      let qty = cekCartItem.Quantity + Quantity;
      const updated = await CartItems.update({ Quantity: qty }, { where: { CartItemID: cekCartItem.CartItemID } });
      if (updated[0] === 0) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      const updatedCartItem = await CartItems.findByPk(req.params.id);
      res.json(updatedCartItem);
    } else {
      const cartItem = await CartItems.create({
        CartID,
        ProductID,
        Quantity,
      });
      res.status(201).json(cartItem);
    }
  } catch (err) {
    console.error("Error inserting cart item", error);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// Update a cart item
router.put("/:id", async (req, res) => {
  try {
    const updated = await CartItems.update(req.body, { where: { CartItemID: req.params.id } });
    if (updated[0] === 0) return res.status(404).json({ message: "Cart item not found" });
    const updatedCartItem = await CartItems.findByPk(req.params.id);
    res.json(updatedCartItem);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// Delete a cart item
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await CartItems.destroy({ where: { CartItemID: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Cart item not found" });
    res.json({ message: "Cart item deleted" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

module.exports = router;
