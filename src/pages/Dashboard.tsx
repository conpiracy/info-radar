import { PageContainer } from "@/components/layout/PageContainer";
import { ProductCard } from "@/components/products/ProductCard";
import { Product, ProductNiche } from "@/types/product";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from 'react';

// State to store fetched products
const [products, setProducts] = useState<Product[]>([]);

useEffect(() => {
  async function fetchData() {
    try {
      const response = await fetch('/api/scrape');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // Assuming the data structure is compatible
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }

  fetchData();
}, []);

export default function Dashboard() {
  const niches: ProductNiche[] = ["gambling", "trading", "betting", "social media", "sales"];

  return (
    <PageContainer>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Top Products</h1>
          <p className="text-muted-foreground mt-2">
            Discover the highest-performing info products across different niches
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-6 lg:w-[600px]">
            <TabsTrigger value="all">All</TabsTrigger>
            {niches.map((niche) => (
              <TabsTrigger key={niche} value={niche}>
                {niche.charAt(0).toUpperCase() + niche.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>

          {niches.map((niche) => (
            <TabsContent key={niche} value={niche} className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {products
                  .filter((product) => product.niche === niche)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </PageContainer>
  );
}