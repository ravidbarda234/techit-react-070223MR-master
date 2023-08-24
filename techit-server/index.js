const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const register = require("./routes/register");
const login = require("./routes/login");
const products = require("./routes/products");
const cart = require("./routes/carts");
const profile = require("./routes/profile");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extends: true }));

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/products", products);
app.use("/api/carts", cart);
app.use("/api/profile", profile);

mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log("Server start on Port", PORT));
