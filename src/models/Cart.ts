import mongoose, { Schema } from "mongoose";

const CartSchema = new Schema({
  userId: mongoose.Schema.Types.ObjectId,
  products: [{ productId: String, quantity: Number }],
});

export const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);
