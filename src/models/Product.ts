import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  title: String,
  price: Number,
});

export const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
