import { OrderStatus } from "../types/OrderStatus";

const transicoesPermitidas: Record<OrderStatus, OrderStatus[]> = {
  RECEIVED: ["CONFIRMED", "CANCELED"],
  CONFIRMED: ["DISPATCHED", "CANCELED"],
  DISPATCHED: ["DELIVERED", "CANCELED"],
  DELIVERED: [],
  CANCELED: [],
};

export function isStatusValido(status: string): status is OrderStatus {
  return (
    status === "RECEIVED" ||
    status === "CONFIRMED" ||
    status === "DISPATCHED" ||
    status === "DELIVERED" ||
    status === "CANCELED"
  );
}

export function podeTransicionar(de: OrderStatus, para: OrderStatus): boolean {
  return transicoesPermitidas[de].includes(para);
}
