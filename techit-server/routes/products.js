const express = require("express");
const joi = require("joi");
const router = express.Router();
const Products = require("../models/Products");
const User = require("../models/User");
const auth = require("../middleware/auth");

const productJoiSchema = joi.object({
  name: joi.string().min(2).required(),
  price: joi.number().required(),
  category: joi.string().min(2).required(),
  description: joi.string().min(2).required(),
  image: joi.string().min(2).required(),
});

//create product
router.post("/", auth, async (req, res) => {
  try {
    if (!req.payload.isAdmin)
      return res.status(400).send("only Admin can upload products");

    const { error } = productJoiSchema.validate(req.body);
    if (error) return res.status(400).send(error);

    let product = await Products.findOne({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    });
    if (product) return res.status(400).send("Product already exist..");

    product = new Products(req.body);
    await product.save();

    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

//all the products
router.get("/", auth, async (req, res) => {
  try {
    const products = await Products.find();
    res.status(201).send(products);
  } catch (error) {
    res.status(400).send(error);
  }
});
//singel product
router.get("/:id", auth, async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) return res.status(400).send("No such product..");
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

//update product
router.put("/:id", auth, async (req, res) => {
  try {
    if (!req.payload.isAdmin)
      return res.status(400).send("Only admin can update product");

    const { error } = productJoiSchema.validate(req.body);
    if (error) return res.status(400).send(error);

    let product = await Products.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!product) return res.status(404).send("No such Product to update..");
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

//delete producte
router.delete("/:id", auth, async (req, res) => {
  try {
    if (!req.payload.isAdmin)
      return res.status(400).send("Only admin can delete product");

    let product = await Products.findOneAndDelete({
      _id: req.params.id,
    });
    if (!product) return res.status(404).send("No such Product here..");
    res.status(201).send("product deleted successfully...");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
