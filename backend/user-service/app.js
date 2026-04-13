const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

/*  DB CONNECTION */

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ User DB connected"))
  .catch(err => console.error("❌ DB error:", err));

/*  MODEL */
const User = mongoose.model("User", {
  name: String,
  email: String
});

/*  ROUTES */
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post("/users", async (req, res) => {
  console.log("API HIT"); // 🔥 debug
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

/*  SERVER */
app.listen(3001, () => console.log("🚀 User service running on port 3001"));
