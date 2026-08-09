import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.ts";
import products from "./data/products.ts";
import User from "./models/user.ts";
import Product from "./models/product.ts";
import Order from "./models/order.ts";
import connectDB from "./config/db.ts";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUser = await User.insertMany(users);
    const adminUser = createdUser[0]._id;

    const sampleProducts = products.map((prod) => {
      return { ...prod, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data imported".green.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data destroyed".red.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
