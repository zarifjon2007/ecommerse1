"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link href={`/product/${product.id}`} className="group">
      <div className="relative overflow-hidden rounded-xl bg-slate-100 aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <Button
            onClick={handleAddToCart}
            className="w-full shadow-lg"
            size="sm"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
        <div className="absolute top-3 left-3">
          <Badge variant="secondary">{product.category}</Badge>
        </div>
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="text-base font-medium text-slate-900 group-hover:text-indigo-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-lg font-semibold text-slate-900">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
