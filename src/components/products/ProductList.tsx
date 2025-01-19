import { useState } from "react";
import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);

  const handleToggleExpand = (productId: string) => {
    setExpandedProductId((prev) => (prev === productId ? null : productId));
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isExpanded={expandedProductId === product.id}
          onToggleExpand={() => handleToggleExpand(product.id)}
        />
      ))}
    </div>
  );
}