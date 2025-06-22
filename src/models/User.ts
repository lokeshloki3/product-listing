import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    cart: {
      type: [
        {
          id: { type: Number, required: true },
          title: { type: String, required: true },
          price: { type: Number, required: true },
          thumbnail: { type: String, required: true },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
