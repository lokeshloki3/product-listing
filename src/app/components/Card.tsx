'use client';

import { addToCart } from "@/store/slices/cartSlice";
import Image from "next/image";
import { useDispatch } from "react-redux";

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
    // const dispatch = useDispatch();

    return (
        <div className="flex flex-col items-center justify-between 
            hover:scale-110 transition duration-300 ease-in gap-3 p-4 mt-10 ml-5 rounded-xl outline border shadow-lg">
            <div>
                <p className="text-gray-700 font-semibold text-lg text-left truncate w-40 mt-1">{product.title}</p>
            </div>

            <div className="h-[180px]">
                <Image
                    src={product.thumbnail}
                    alt={product.title}
                    width={300}
                    height={300}
                />
            </div>

            <div className="flex justify-between gap-12 items-center w-full mt-5">
                <div>
                    <p className="text-green-600 font-semibold">Rs {product.price}</p>
                </div>
            </div>
            {/* <button
                onClick={() =>
                    dispatch(addToCart({ productId: product.id }))
                }
                className="bg-green-600 text-white px-4 py-2 rounded"
            >
                Add to Cart
            </button> */}
        </div>
    );
}
