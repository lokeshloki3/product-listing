"use client";

import Card from "@/components/Card";
import Image from "next/image";
import { useEffect, useState } from "react";

type Product = {
  id: number,
  title: string,
  price: number,
  thumbnail: string,
}

export default function Home() {

  const API_URL = "https://dummyjson.com/products";
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const mockData = async () => {
    setLoading(true);
    try {
      const fetchData = await fetch(API_URL);
      const response: { products: Product[] } = await fetchData.json();
      setProducts(response.products);
      console.log(response.products);

    } catch (error: unknown) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    mockData();
  }, [])

  return (
    <div>
      {
        loading ? (
          <p className="text-xl text-center font-medium text-blue-600">Loading products...</p>
        ) : (
          products.length > 0 ? (
            <div className="grid mb-8 xs:grid cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
        max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]">
              {
                products.map((product) => (
                  <Card key={product.id} product={product} />
                ))
              }
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <p>No Data Found</p>
            </div>
          )
        )
      }
    </div>
  );
}
