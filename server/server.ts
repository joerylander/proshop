import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.ts";
import { notFound, errorHandler } from "./middleware/errorHandler.ts";
dotenv.config();

const port = process.env.PORT || 5001;

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("Api is running...");
});

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`hej at ${port}`));
