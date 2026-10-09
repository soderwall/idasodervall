export type ProductType = 'original' | 'print';

export interface Product {
  id: string;
  title: string;
  slug: string;
  type: ProductType;
  price: number;
  dimensions: string;
  technique?: string;
  description: string;
  story?: string;
  images: string[];
  stock: number;
  edition?: string; // e.g. "Begränsad upplaga om 30 numrerade ex" or "Original 1/1"
  isLimitedEdition: boolean;
  signedByHand: boolean;
  shippedFromStudio: boolean;
  featured?: boolean;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentStatus = 'pending' | 'completed' | 'failed';
export type ShippingStatus = 'pending' | 'shipped' | 'delivered';

export interface OrderItem {
  productId: string;
  productTitle: string;
  quantity: number;
  price: number;
  type: ProductType;
  image?: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  postalCode: string;
  city: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: ShippingAddress;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: 'swish';
  paymentStatus: PaymentStatus;
  shippingStatus: ShippingStatus;
  createdAt: string;
  swishRef?: string;
}
