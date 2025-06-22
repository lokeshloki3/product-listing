'use client';

import Image from "next/image";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/store/slices/cartSlice";
import { motion } from "framer-motion";

type CartItem = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

type Props = {
  item: CartItem;
};

export default function CartItem({ item }: Props) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));

    fetch("/api/cart/remove", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: item.id }),
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25 }}
      className="grid grid-cols-[100px_1fr_auto] items-center gap-4 p-4 border rounded shadow-sm"
    >
      <Image
        src={item.thumbnail}
        alt={item.title}
        width={80}
        height={80}
        className="rounded object-contain"
      />
      <div className="space-y-1">
        <p className="font-semibold">{item.title}</p>
        <p className="text-gray-600">Rs {item.price}</p>
      </div>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleRemove}
        className="text-red-500 border-2 border-gray-700 rounded-full font-semibold cursor-pointer text-[12px] p-1 px-3 hover:bg-gray-400"
      >
        Remove
      </motion.button>
    </motion.div>
  );
}
