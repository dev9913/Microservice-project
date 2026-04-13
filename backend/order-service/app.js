const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

require("dotenv").config();

/*  DB CONNECTION */
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Order DB connected"))
  .catch(err => console.error("❌ DB error:", err));

/*  MODEL */
const Order = mongoose.model("Order", {
  productId: String,
  quantity: Number,
  productName: String
});

/*  ROUTES */
app.get("/orders", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

app.post("/orders", async (req, res) => {
  console.log("🟢 Order API HIT");

  const { productId, quantity } = req.body;

  try {
    /*  CALL PRODUCT SERVICE */
    const productRes = await axios.get("http://product-svc:3002/products");

    const product = productRes.data.find(p => p._id === productId);

    if (!product) {
      return res.status(404).send("❌ Product not found");
    }

    const order = new Order({
      productId,
      quantity,
      productName: product.name
    });

    await order.save();

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Error creating order");
  }
});

/*  SERVER */
app.listen(3003, () => console.log(" Order service running on 3003"));
