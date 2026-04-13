const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

require("dotenv").config();

/*  DB CONNECTION */

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Product DB connected"))
  .catch(err => console.error("❌ DB error:", err));

/*  MODEL */
const Product = mongoose.model("Product", {
  name: String,
  price: Number
});

/*  ROUTES */
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post("/products", async (req, res) => {
  console.log("🟢 Product API HIT");

  const product = new Product(req.body);
  await product.save();

  res.json(product);
});

/*  SERVER */
app.listen(3002, () => console.log(" Product service running on 3002"));
