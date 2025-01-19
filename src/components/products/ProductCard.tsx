import { ChevronDown, ChevronUp, Twitter, Instagram, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types/product";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export function ProductCard({ product, isExpanded, onToggleExpand }: ProductCardProps) {
  return (
    <Card className={cn("w-full transition-all duration-200 hover:shadow-lg", { "expanded": isExpanded })}>
      <CardHeader className="cursor-pointer" onClick={onToggleExpand}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">{product.name}</CardTitle>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
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
        className={cn(
          "grid gap-4 overflow-hidden transition-all duration-200"
        )}
      >
        <div className="min-h-0">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Value Proposition</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                {product.valueProposition}
              </p>
            </div>
            <div>
              <h4 className="font-medium">Whop Ranking</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                #{product.ranking} in daily revenue
              </p>
            </div>
            <div className="flex gap-2">
              {product.socialLinks.twitter && (
                <Button variant="outline" size="icon" asChild>
                  <a href={product.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {product.socialLinks.instagram && (
                <Button variant="outline" size="icon" asChild>
                  <a href={product.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {product.socialLinks.discord && (
                <Button variant="outline" size="icon" asChild>
                  <a href={product.socialLinks.discord} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}