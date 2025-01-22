const express = require("express");
const Product = require("../models/Product");
const { Op } = require("sequelize");
const { verifyToken } = require("../routes/auth");
const { postValidateInput } = require("../controllers/apiController");

const router = express.Router();

// Get All Products
router.get("/", verifyToken, async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// Get All Product with Pagination
router.get("/paging", verifyToken, async (req, res) => {
  try {
    const { page = 1, size = 10 } = req.query;

    const limit = parseInt(size, 10) || 10; // Jumlah item per halaman
    const offset = (parseInt(page, 10) - 1) * limit; // Offset berdasarkan halaman

    const { count, rows: products } = await Product.findAndCountAll({
      limit,
      offset,
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page, 10),
      products,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// Get product by ID
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// Get product by Price and minimum Stock using 2 parameters
router.get("/filter/:price/:minStock", verifyToken, async (req, res) => {
  try {
    const { price, minStock } = req.params;

    // Query produk dengan filter price dan minimum stock
    const products = await Product.findAll({
      where: {
        Price: price,
        Stock: { [Op.gte]: minStock }, // Menggunakan operator greater than or equal
      },
    });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "Products not found" });
    }
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// Get product by Price and minimum Stock using request body
router.get("/filter", verifyToken, async (req, res) => {
  try {
    const { price, minStock } = req.body;

    // Validasi input
    if (price === undefined || minStock === undefined) {
      return res.status(400).json({ message: "Price and minStock are required" });
    }

    // Query produk dengan filter price dan minimum stock
    const products = await Product.findAll({
      where: {
        Price: price,
        Stock: { [Op.gte]: minStock }, // Menggunakan operator greater than or equal
      },
    });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "Products not found" });
    }
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// Create a new product
router.post("/", verifyToken, async (req, res) => {
  try {
    const { Name, Description, Price, Stock } = req.body;

    // Buat data produk baru tanpa menyertakan CreatedAt atau UpdatedAt
    const product = await Product.create({
      Name,
      Description,
      Price,
      Stock,
    });
    res.status(201).json(product);
  } catch (err) {
    console.error("Error inserting product", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// Update a product
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updated = await Product.update(req.body, { where: { ProductID: req.params.id } });
    if (updated[0] === 0) return res.status(404).json({ message: "Product not found" });
    const updatedProduct = await Product.findByPk(req.params.id);
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// Delete a product
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deleted = await Product.destroy({ where: { ProductID: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

module.exports = router;
