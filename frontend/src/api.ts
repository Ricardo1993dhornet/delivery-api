import { OrderRecord, OrderStatus } from "./types";

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:3000";

export async function listarPedidos(): Promise<OrderRecord[]> {
  const res = await fetch(`${API_BASE}/orders`);
  if (!res.ok) throw new Error("Erro ao listar pedidos.");
  return res.json();
}

export async function buscarPedido(orderId: string): Promise<OrderRecord> {
  const res = await fetch(`${API_BASE}/orders/${orderId}`);
  if (!res.ok) throw new Error("Erro ao buscar pedido.");
  return res.json();
}

export async function atualizarStatus(orderId: string, newStatus: OrderStatus): Promise<OrderRecord> {
  const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ new_status: newStatus }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message ?? "Erro ao atualizar status.");
  return data;
}
