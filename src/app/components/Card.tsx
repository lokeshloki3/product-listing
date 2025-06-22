'use client';

import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/store/slices/cartSlice";
import Image from "next/image";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type CartItem = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

type CardProps = {
  product: Product;
};

export default function Card({ product }: CardProps) {
  const dispatch = useDispatch();
  const router = useRouter();

  const cart: CartItem[] = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.auth.user);
  const isInCart = cart.some((item) => item.id === product.id);

  const handleAdd = async () => {
    if (!user) {
      alert("Please login to add items to your cart.");
      router.push("/login");
      return;
    }

    dispatch(addToCart(product));

    await fetch("/api/cart/add", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
  };

  const handleRemove = async () => {
    if (!user) return;

    dispatch(removeFromCart(product.id));

    await fetch("/api/cart/remove", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id }),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-between gap-4 p-5 mt-6 rounded-xl outline border shadow-md w-full max-w-[280px] mx-auto sm:max-w-[300px]"
    >
      <div className="w-full">
        <p className="text-gray-700 font-semibold text-base text-center sm:text-left truncate">
          {product.title}
        </p>
      </div>

      <div className="h-[160px] w-auto flex items-center justify-center">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={140}
          height={140}
          className="object-contain max-h-full"
        />
      </div>

      <div className="flex justify-between items-center w-full mt-4">
        <p className="text-green-600 font-semibold text-sm sm:text-base">
          Rs {product.price}
        </p>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={isInCart ? handleRemove : handleAdd}
          className={`rounded-full font-semibold text-[11px] sm:text-[12px] py-1 px-3 uppercase transition duration-300 ease-in cursor-pointer
            ${
              isInCart
                ? "bg-red-100 text-red-700 border border-red-500 hover:bg-red-200"
                : "text-gray-700 border-2 border-gray-700 hover:bg-gray-700 hover:text-white"
            }`}
        >
          {isInCart ? "Remove" : "Add to Cart"}
        </motion.button>
      </div>
    </motion.div>
  );
}
