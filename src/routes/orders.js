const express = require("express");
const Order = require("../models/Order");
const { verifyToken } = require("../routes/auth");

const router = express.Router();

// Get all orders
router.get("/", verifyToken, async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// Get order by ID
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// Create a new order
router.post("/", verifyToken, async (req, res) => {
  try {
    const { CartID, TotalAmount } = req.body;
    const order = await Order.create({ CartID, TotalAmount });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// Update an order
// router.put('/:id', async (req, res) => {
//     try {
//       const updated = await Order.update(req.body, { where: { OrderID: req.params.id } });
//       if (updated[0] === 0) return res.status(404).json({ message: 'Order not found' });
//       const updatedOrder = await Order.findByPk(req.params.id);
//       res.json(updatedOrder);
//     } catch (err) {
//       res.status(500).json({ message: 'Internal Server Error', error: err.message });
//     }
//   });
const moment = require("moment");
const { QueryTypes } = require("sequelize");
const sequelize = require("../../config/database");

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { OrderDate, CartID, TotalAmount } = req.body;
    const id = req.params.id;

    // Format OrderDate jika ada
    const formattedDate = OrderDate ? moment(OrderDate).format("YYYY-MM-DD HH:mm:ss") : null;

    const result = await sequelize.query(
      `
        UPDATE Orders
        SET CartID = :CartID,
            TotalAmount = :TotalAmount,
            OrderDate = :OrderDate
        WHERE OrderID = :id
        `,
      {
        replacements: {
          CartID,
          TotalAmount,
          OrderDate: formattedDate,
          id,
        },
        type: QueryTypes.UPDATE,
      }
    );

    if (result[1] === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    const updatedOrder = await Order.findByPk(id);
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// Delete an order
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deleted = await Order.destroy({ where: { OrderID: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

module.exports = router;
