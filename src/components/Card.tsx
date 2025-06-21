// components/Card.tsx
import Image from "next/image";

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
  return (
    <div className="bg-white border rounded-lg shadow-sm hover:shadow-lg transition p-4 flex flex-col">
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={300}
        height={200}
        className="rounded-lg object-cover w-full h-48"
      />
      <h2 className="mt-4 text-lg font-semibold">{product.title}</h2>
      <div className="mt-auto pt-4 text-blue-600 font-bold text-right text-lg">
        ${product.price}
      </div>
    </div>
  );
}
