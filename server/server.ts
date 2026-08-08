import express from "express";
import products from "./data/products.ts";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();

const port = process.env.PORT || 5001;

connectDB();

const app = express();
const api = express.Router();

app.get("/", (req, res) => {
  res.send("Api is running...");
});

api.get("/", (req, res) => {
  res.json(products);
});

api.get("/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.use("/api/products", api);

app.listen(port, () => console.log(`hej at ${port}`));
