const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Carts = require("../models/Carts");
const joi = require("joi");

const productJoiSchema = joi.object({
  name: joi.string().min(2).required(),
  price: joi.number().required(),
  category: joi.string().min(2).required(),
  description: joi.string().min(2).required(),
  image: joi.string().min(2).required(),
  _id: joi.string(),
  // quantity: joi.number().required(),
});

//add product to cart - product details in body
router.post("/", auth, async (req, res) => {
  try {
    //1. joi validation
    const { error } = productJoiSchema.validate(req.body);
    if (error) res.status(400).send(error);
    //2. find user cart
    let cart = await Carts.findOne({ userId: req.payload._id, active: true });
    if (!cart)
      return res.status(404).send("No activ cart available for this user");
    //3. chack if the product already exist in user cart
    let productToFind = cart.products.find((p) => p._id == req.body._id);
    if (productToFind) {
      //increment the quantity
      let indexToUpdate = cart.products.findIndex((p) => p._id == req.body._id);
      cart.products[indexToUpdate].quantity++;
      cart.markModified("products");
    } else {
      cart.products.push({ ...req.body, quantity: 1 });
    }
    await cart.save();
    //4. add product to pruducts array
    //5. return response
    res.status(201).send("Product added successfully to cart!");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    let cart = await Carts.findOne({ userId: req.payload._id, active: true });
    if (!cart)
      return res.status(404).send("No activ cart available for this user");
    res.status(200).send(cart.products);
  } catch (error) {
    res.status(400).send(error);
  }
});

// router.delete("/", auth, async (req, res) => {
//   try {
//     let cart = await Carts.findOne({ userId: req.payload._id, active: true });
//     if (!cart)
//           return res.status(404).send("No activ cart available for this user");
//       const itemToRemove = req.payload.id;
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

module.exports = router;
