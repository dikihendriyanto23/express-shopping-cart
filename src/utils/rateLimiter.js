const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100, // Maksimum 100 permintaan per IP
  message: { error: "Terlalu banyak permintaan, coba lagi nanti." },
});

module.exports = limiter;
