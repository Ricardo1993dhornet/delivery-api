import fs from "fs";
import path from "path";
import { OrderRecord } from "../types/Order";

const PEDIDOS_PATH = path.resolve(process.cwd(), "pedidos.json");

let cache: OrderRecord[] | null = null;

export function carregarPedidos(): OrderRecord[] {
  if (cache) return cache;

  if (!fs.existsSync(PEDIDOS_PATH)) {
    // Caso extremo: não existe. Mas no desafio ele existe.
    cache = [];
    fs.writeFileSync(PEDIDOS_PATH, JSON.stringify(cache, null, 2), "utf-8");
    return cache;
  }

  const raw = fs.readFileSync(PEDIDOS_PATH, "utf-8");
  cache = JSON.parse(raw) as OrderRecord[];
  return cache;
}

export function salvarPedidos(pedidos: OrderRecord[]): void {
  cache = pedidos;
  fs.writeFileSync(PEDIDOS_PATH, JSON.stringify(pedidos, null, 2), "utf-8");
}

export function listarPedidos(): OrderRecord[] {
  return carregarPedidos();
}

export function buscarPorId(orderId: string): OrderRecord | null {
  const pedidos = carregarPedidos();
  return pedidos.find((p) => p.order_id === orderId) ?? null;
}

export function inserirPedido(novo: OrderRecord): OrderRecord {
  const pedidos = carregarPedidos();
  pedidos.push(novo);
  salvarPedidos(pedidos);
  return novo;
}

export function atualizarPedido(orderId: string, atualizado: OrderRecord): OrderRecord | null {
  const pedidos = carregarPedidos();
  const idx = pedidos.findIndex((p) => p.order_id === orderId);
  if (idx === -1) return null;

  pedidos[idx] = atualizado;
  salvarPedidos(pedidos);
  return atualizado;
}

export function removerPedido(orderId: string): boolean {
  const pedidos = carregarPedidos();
  const idx = pedidos.findIndex((p) => p.order_id === orderId);
  if (idx === -1) return false;

  pedidos.splice(idx, 1);
  salvarPedidos(pedidos);
  return true;
}
