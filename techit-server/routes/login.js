const express = require("express");
const router = express.Router();
const joi = require("joi");
const User = require("../models/User");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginSchema = joi.object({
  email: joi.string().required().min(2).email(),
  password: joi.string().required().min(8),
});

router.post("/", async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).send(error);

    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(404).send("Wrong email or password, try again");

    const result = await bcrypt.compare(req.body.password, user.password);
    if (!result)
      return res.status(400).send("Wrong email or password, try again");

    const token = jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin, email: user.email },
      process.env.jwtKey
    );
    res.status(200).send(token);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
