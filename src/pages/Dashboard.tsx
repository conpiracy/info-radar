import { PageContainer } from "@/components/layout/PageContainer";
import { ProductList } from "@/components/products/ProductList";
import { Product, ProductNiche } from "@/types/product";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data - replace with actual API call later
const mockProducts: Product[] = Array.from({ length: 50 }, (_, i) => {
  const niches: ProductNiche[] = ["gambling", "trading", "betting", "social media", "sales"];
  const niche = niches[Math.floor(i / 10)]; // Evenly distribute 10 products per niche
  
  return {
    id: `product-${i + 1}`,
    name: `${niche.charAt(0).toUpperCase() + niche.slice(1)} Product ${i + 1}`,
    description: "Product description here",
    niche,
    revenue: `$${Math.floor(Math.random() * 50000 + 10000)}`,
    ranking: i + 1,
    socialLinks: {
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      discord: "https://discord.com",
    },
    valueProposition: "Comprehensive training and tools to help you succeed in " + niche,
  };
});

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
            <ProductList products={mockProducts} />
          </TabsContent>

          {niches.map((niche) => (
            <TabsContent key={niche} value={niche} className="mt-6">
              <ProductList
                products={mockProducts.filter((product) => product.niche === niche)}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </PageContainer>
  );
}