import { ChevronDown } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="bg-[#0B0F17] text-white border-[#1E2533]">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-medium">{product.name}</h3>
            <div className="flex items-center gap-3">
              <span className="text-[#36B37E] text-sm">{product.category}</span>
              <span className="text-gray-400">
                Daily Revenue: ${product.dailyRevenue.toLocaleString()}
              </span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-400">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-4">
          <h4 className="text-white/90">Value Proposition</h4>
          <p className="text-gray-400 text-sm mt-1">{product.valueProposition}</p>
        </div>
      </CardContent>
    </Card>
  );
}
