const { isAlphanumeric } = require("validator");

exports.getHello = (req, res) => {
  res.status(200).json({ message: "Hello, World!" });
};

exports.postValidateInput = (req, res) => {
  try {
    let errors = [];
    for (const [key, value] of Object.entries(req.body)) {
      if (!isAlphanumeric(value)) {
        errors.push(`${key} tidak valid`);
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ message: "Input tidak valid", errors });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: "Error validating input", err });
  }
};
