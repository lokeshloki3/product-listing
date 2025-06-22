'use client';

import Card from "@/app/components/Card";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Product = {
  id: number,
  title: string,
  price: number,
  thumbnail: string,
};

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
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    mockData();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center min-h-[91vh]">
          <p className="text-xl text-center font-medium">Loading products...</p>
        </div>
      ) : (
        products.length > 0 ? (
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-10 min-h-[80vh]">
            <h1 className="text-2xl sm:text-3xl font-bold text-center my-8">
              Our Products
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <AnimatePresence>
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-[91vh]">
            <p className="text-xl text-center font-medium">No Product Found</p>
          </div>
        )
      )}
    </div>
  );
}
