import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/ProductCard';
import { PageContainer } from '@/components/layout/PageContainer';

export default function HomePage() {
  const { data, isLoading, error } = useProducts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products</div>;
  }

  return (
    <PageContainer>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </PageContainer>
  );
}
