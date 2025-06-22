'use client';

import { useSelector } from 'react-redux';
import Link from 'next/link';
import CartItem from '../components/CartIem';

export default function CartPage() {
  const cart = useSelector((state: any) => state.cart.items);
  const totalAmount = cart.reduce((acc: number, item: any) => acc + item.price, 0);

  return (
    <div className="p-6">
      {cart.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex flex-col gap-4">
            {cart.map((item: any, index: number) => (
              <CartItem key={item.id} item={item} itemIndex={index} />
            ))}
          </div>

          <div className="flex flex-col justify-between w-[400px] p-8 border rounded shadow">
            <div>
              <h2 className="text-green-600 font-bold uppercase">Your Cart</h2>
              <h3 className="text-2xl font-bold mb-4">Summary</h3>
              <p>Total Items: {cart.length}</p>
            </div>

            <div className="mt-6">
              <p className="font-medium">Total Amount:</p>
              <p className="font-bold text-xl">Rs {totalAmount}</p>
              <button className="w-full mt-4 bg-green-600 text-white py-3 rounded">
                Checkout Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <h1 className="font-bold text-xl mb-4">Your Cart is Empty</h1>
          <Link href="/">
            <button className="bg-green-600 text-white px-6 py-3 rounded">Shop Now</button>
          </Link>
        </div>
      )}
    </div>
  );
}
