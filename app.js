const express = require("express");
const sequelize = require("./config/database");
const productsRouter = require("./src/routes/product");
const addressRouter = require("./src/routes/address");
const cartRouter = require("./src/routes/cart");
const cartItemRouter = require("./src/routes/cartItems");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");
const yaml = require("yaml"); // Tambahkan pustaka YAML

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Filter Payload
app.use((req, res, next) => {
  if (req.body) {
    delete req.body.CreatedAt;
    delete req.body.UpdatedAt;
  }
  next();
});

// Swagger UI
const swaggerDocumentPath = path.join(__dirname, "docs", "openapi.yaml");
const swaggerDocument = yaml.parse(fs.readFileSync(swaggerDocumentPath, "utf8")); // Parse YAML
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/products", productsRouter);
app.use("/address", addressRouter);
app.use("/cart", cartRouter);
app.use("/cart-items", cartItemRouter);

// Database Sync
const syncDatabase = async () => {
  try {
    // await sequelize.sync({ alter: true });
    await sequelize.sync(); // Sinkronisasi tanpa mengubah tabel
    console.log("Database synced successfully.");
  } catch (err) {
    console.error("Error syncing database:", err);
  }
};
syncDatabase();

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});
