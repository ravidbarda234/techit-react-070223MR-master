const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  name: { type: String, minlength: 2, required: true },
  price: {
    type: Number,
    required: true,
  },
  category: { type: String, minlength: 2, required: true },
  description: { type: String, minlength: 2, required: true },
  image: { type: String, minlength: 2, required: true },
});

const Products = mongoose.model("products", productsSchema);

module.exports = Products;
