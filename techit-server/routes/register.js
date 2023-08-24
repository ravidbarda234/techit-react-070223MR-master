const express = require("express");
const router = express.Router();
const joi = require("joi");
const User = require("../models/User");
const Carts = require("../models/Carts");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userJoiSchema = joi.object({
  name: joi.string().required().min(2),
  email: joi.string().required().min(2).email(),
  password: joi.string().required().min(8),
  isAdmin: joi.boolean().required(),
});

router.post("/", async (req, res) => {
  try {
    const { error } = userJoiSchema.validate(req.body);
    if (error) return res.status(400).send(error);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already exist..");

    user = new User(req.body);

    let salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    //cart
    let cart = new Carts({ userId: user._id, products: [], active: true });

    await cart.save();

    const token = jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin, email: user.email },
      process.env.jwtKey
    );

    res.status(201).send(token);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
