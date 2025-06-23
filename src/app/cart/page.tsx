'use client';

import { useSelector } from "react-redux";
import Link from "next/link";
import CartItem from "../components/CartIem";
import { motion, AnimatePresence } from "framer-motion";

type CartItem = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

export default function CartPage() {
  const cart = useSelector((state: { cart: { items: CartItem[] } }) => state.cart.items);
  const totalAmount = Math.round(cart.reduce((acc, item) => acc + item.price, 0));

  return (
    <div className="mt-10 px-4">
      {cart.length > 0 ? (
        <div className="grid md:grid-cols-[2fr_1fr] gap-8 max-w-6xl mx-auto">
          <div className="space-y-4">
            <AnimatePresence>
              {cart.map((item: CartItem) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <CartItem item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="sticky top-24 self-start bg-gray-50 p-8 rounded shadow-sm h-fit"
          >
            <h2 className="text-green-600 font-bold uppercase mb-2">Your Cart</h2>
            <h3 className="text-green-600 text-3xl font-bold mb-6">Summary</h3>
            <p className="font-bold mb-2">Total Items: {cart.length}</p>
            <p className="font-medium mb-1">Total Amount:</p>
            <p className="font-bold text-lg mb-6">Rs {totalAmount}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 text-white w-full uppercase py-3 px-4 rounded-lg text-sm font-semibold cursor-pointer"
            >
              Checkout Now
            </motion.button>
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col justify-center items-center h-96"
        >
          <h1 className="font-bold text-xl mb-5">Cart Empty</h1>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white text-xs font-semibold bg-green-600 uppercase py-3 px-7 rounded-lg cursor-pointer"
            >
              Shop Now
            </motion.button>
          </Link>
        </motion.div>
      )}
    </div>
  );
}
