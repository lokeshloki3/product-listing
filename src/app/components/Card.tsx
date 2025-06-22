'use client';

import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/store/slices/cartSlice";
import Image from "next/image";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";

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
  const cart = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.auth.user);

  const isInCart = cart.some((item: any) => item.id === product.id);

  const handleAdd = async () => {
    if (!user) {
      alert("Please login to add items to your cart.");
      router.push("/login");
      return;
    }

    dispatch(addToCart(product));

    const res = await fetch("/api/cart/add", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    const data = await res.json();
    if (!res.ok) console.error("Add error:", data);
  };

  const handleRemove = async () => {
    if (!user) return;

    dispatch(removeFromCart(product.id));

    try {
      const res = await fetch("/api/cart/remove", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      });

      if (!res.ok) {
        console.error("Failed to remove from DB");
      }
    } catch (error) {
      console.error("Error removing from DB:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between hover:scale-105 transition p-4 mt-6 rounded-xl border shadow">
      <p className="text-gray-700 font-semibold text-lg truncate w-40">{product.title}</p>

      <div className="h-[180px]">
        <Image src={product.thumbnail} alt={product.title} width={180} height={180} />
      </div>

      <div className="flex justify-between items-center w-full mt-4">
        <p className="text-green-600 font-semibold">Rs {product.price}</p>
        <button
          onClick={isInCart ? handleRemove : handleAdd}
          className="px-3 py-1 rounded bg-blue-600 text-white text-xs cursor-pointer"
        >
          {isInCart ? "Remove" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
