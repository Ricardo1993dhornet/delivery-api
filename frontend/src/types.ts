export type OrderStatus =
  | "RECEIVED"
  | "CONFIRMED"
  | "DISPATCHED"
  | "DELIVERED"
  | "CANCELED";

export interface OrderRecord {
  store_id: string;
  order_id: string;
  order: {
    payments: { prepaid: boolean; value: number; origin: string }[];
    last_status_name: OrderStatus;
    store: { name: string; id: string };
    total_price: number;
    order_id: string;
    items: {
      code: number;
      price: number;
      observations: string | null;
      total_price: number;
      name: string;
      quantity: number;
      discount: number;
      condiments: any[];
    }[];
    created_at: number;
    statuses: { created_at: number; name: OrderStatus; order_id: string; origin: string }[];
    customer: { temporary_phone: string; name: string };
    delivery_address: {
      reference: string | null;
      street_name: string;
      postal_code: string;
      country: string;
      city: string;
      neighborhood: string;
      street_number: string;
      state: string;
      coordinates: { longitude: number; latitude: number; id: number };
    };
  };
}
