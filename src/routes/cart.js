const express = require("express");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const Carts = require("../models/Carts");
const CartItems = require("../models/CartItems");
const Product = require("../models/Product");
const { verifyToken } = require("../routes/auth");

const router = express.Router();

// Get All Cart
router.get("/", verifyToken, async (req, res) => {
  try {
    const carts = await Carts.findAll({
      include: {
        model: CartItems,
        include: {
          model: Product,
        },
      },
    });
    res.status(200).json({
      message: "Get data success",
      data: carts,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// Get Cart by ID
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const carts = await Carts.findAll({
      where: {
        CartID: req.params.id,
      },
      include: {
        model: CartItems,
        include: {
          model: Product,
        },
      },
    });
    res.status(200).json({
      message: "Get data success",
      data: carts,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const { CartID, ProductID, Quantity } = req.body;

    const cart = await Carts.create();

    const cartItem = await CartItems.create({
      CartID: cart.CartID,
      ProductID: ProductID,
      Quantity: Quantity,
    });

    res.status(201).json({
      message: "Create data success",
      data: cartItem,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const cartItemDelete = await CartItems.destroy({
      where: {
        CartID: req.params.id,
      },
    });

    const cartDelete = await Carts.destroy({
      where: {
        CartID: req.params.id,
      },
    });

    res.status(201).json({
      message: "Create data success",
      data: cartDelete,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

module.exports = router;
