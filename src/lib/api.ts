import axios from 'axios';
import { ApiResponse, Product } from '@/types/api';
import { API_URL } from '@/config';

export const fetchProducts = async (): Promise<ApiResponse<Product[]>> => {
  const response = await axios.get<ApiResponse<Product[]>>(`${API_URL}/api/products`);
  return response.data;
};

export const fetchProductByUrl = async (url: string): Promise<ApiResponse<Product>> => {
  const response = await axios.get<ApiResponse<Product>>(`${API_URL}/api/products/${url}`);
  return response.data;
};

export const fetchScrapedData = async (): Promise<ApiResponse<any>> => {
  const response = await fetch(`${API_URL}/api/data`);
  const data = await response.json();
  return data;
};
