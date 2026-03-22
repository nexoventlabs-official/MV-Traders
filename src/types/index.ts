export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'oils' | 'pickles';
  image: string;
  images?: string[];
  inStock: boolean;
  featured?: boolean;
  bulkAvailable?: boolean;
  weight?: string;
  ingredients?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BulkInquiry {
  name: string;
  email: string;
  phone: string;
  company?: string;
  products: string[];
  quantity: string;
  message?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  color: 'gold' | 'red';
  slug: string;
}