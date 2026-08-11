import express from "express";
import asyncHandler from "../middleware/asyncHandler";
import Product from "../models/product";
const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});

    res.json(products);
  }),
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    console.log(product);

    if (product) {
      return res.json(product);
    } else {
      res.status(404);
      throw new Error("Resource not found");
    }
  }),
);

export default router;
