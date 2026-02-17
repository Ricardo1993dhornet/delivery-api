import { OrderStatus } from "./OrderStatus";

export type PaymentOrigin = "CREDIT_CARD" | "PIX" | "CASH" | "VR";

export interface Payment {
  prepaid: boolean;
  value: number;
  origin: PaymentOrigin;
}

export interface StoreInfo {
  name: string;
  id: string;
}

export interface Coordinates {
  longitude: number;
  latitude: number;
  id: number;
}

export interface DeliveryAddress {
  reference: string | null;
  street_name: string;
  postal_code: string;
  country: string;
  city: string;
  neighborhood: string;
  street_number: string;
  state: string;
  coordinates: Coordinates;
}

export interface Customer {
  temporary_phone: string;
  name: string;
}

export interface Condiment {
  name?: string;
  code?: number;
  price?: number;
}

export interface OrderItem {
  code: number;
  price: number;
  observations: string | null;
  total_price: number;
  name: string;
  quantity: number;
  discount: number;
  condiments: Condiment[];
}

export type StatusOrigin = "STORE" | "SYSTEM";

export interface OrderStatusHistory {
  created_at: number;
  name: OrderStatus;
  order_id: string;
  origin: StatusOrigin;
}

export interface OrderData {
  payments: Payment[];
  last_status_name: OrderStatus;
  store: StoreInfo;
  total_price: number;
  order_id: string;
  items: OrderItem[];
  created_at: number;
  statuses: OrderStatusHistory[];
  customer: Customer;
  delivery_address: DeliveryAddress;
}

export interface OrderRecord {
  store_id: string;
  order_id: string;
  order: OrderData;
}
