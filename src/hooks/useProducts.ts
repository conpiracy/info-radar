import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => api.getProducts(),
    staleTime: 1000 * 60 * 5 // Cache for 5 minutes
  });
}

export function useProduct(url: string) {
  return useQuery({
    queryKey: ['product', url],
    queryFn: () => api.getProductByUrl(url)
  });
}
