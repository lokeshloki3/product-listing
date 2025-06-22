'use client';

import Image from "next/image";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/store/slices/cartSlice";

export default function CartItem({ item }: any) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
    fetch("/api/cart/remove", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: item.id }),
    });
  };

  return (
    <div className="flex items-center gap-4 p-4 border rounded shadow-sm">
      <Image src={item.thumbnail} alt={item.title} width={80} height={80} />
      <div>
        <p className="font-semibold">{item.title}</p>
        <p className="text-gray-600">Rs {item.price}</p>
        <button onClick={handleRemove} className="text-red-500 text-sm mt-1 hover:underline">
          Remove
        </button>
      </div>
    </div>
  );
}
