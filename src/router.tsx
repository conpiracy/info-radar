
import { createBrowserRouter, RouterProvider } from 'react-router';
import Products from './routes/Products';

async function productsLoader() {
  const response = await fetch('http://your-api-endpoint/products');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Products />,
    loader: productsLoader,
    errorElement: <div className="text-center text-red-500 p-8">Error loading products</div>
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}