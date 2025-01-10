import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Product } from '@/types/api';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.title}</CardTitle>
        <CardDescription className="mt-2">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-medium text-primary">
            {product.niche}
          </span>
          <span className="ml-2 text-sm text-muted-foreground">
            Daily Revenue: {product.revenue}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent
        data-content
        className={cn("grid gap-4 overflow-hidden transition-all duration-200")}
      >
        <div className="min-h-0">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Value Proposition</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                {product.valueProposition}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
