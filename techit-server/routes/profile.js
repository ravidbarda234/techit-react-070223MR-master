const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const _ = require("lodash");

router.get("/", auth, async (req, res) => {
  try {
    //1. check user details
    const user = await User.findById(req.payload._id);
    if (!user) return res.status(400).send("No such user..");
    //2. return a response
    res.status(201).send(_.pick(user, ["_id", "name", "email", "isAdmin"]));
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    //  if (!req.payload.isAdmin)
    //    return res.status(400).send("Only admin can delete product");
    const user = await User.findById(req.payload._id);
    if (!user) return res.status(400).send("No such user..");

    let userToDelete = await User.findOneAndDelete({
      _id: req.params.id,
    });
    if (!userToDelete) return res.status(404).send("No such User here..");
    res.status(201).send("User deleted successfully...");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
