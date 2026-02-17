import React from "react";
import { OrderStatus } from "../types";

const map: Record<OrderStatus, string> = {
  RECEIVED: "Recebido",
  CONFIRMED: "Confirmado",
  DISPATCHED: "Despachado",
  DELIVERED: "Entregue",
  CANCELED: "Cancelado",
};

export function Badge({ status }: { status: OrderStatus }) {
  return (
    <span
      style={{
        padding: "4px 10px",
        borderRadius: 999,
        border: "1px solid #ddd",
        fontSize: 12,
        fontWeight: 600,
        display: "inline-block",
      }}
      title={status}
    >
      {map[status]}
    </span>
  );
}
