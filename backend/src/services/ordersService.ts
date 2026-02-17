import { OrderRecord, OrderData } from "../types/Order";
import { OrderStatus } from "../types/OrderStatus";
import { agoraEmMillis } from "../utils/now";
import { gerarUUID } from "../utils/uuid";
import {
  atualizarPedido,
  buscarPorId,
  inserirPedido,
  listarPedidos,
  removerPedido,
} from "../repositories/ordersRepository";
import { isStatusValido, podeTransicionar } from "../validators/statusMachine";

export function getAllOrders(): OrderRecord[] {
  return listarPedidos();
}

export function getOrderById(orderId: string): OrderRecord | null {
  return buscarPorId(orderId);
}

export function createOrder(payload: Partial<OrderRecord>): OrderRecord {
  // Aqui a ideia é manter simples e respeitar o formato do JSON
  // Regras:
  // - order_id precisa existir (vamos gerar se não vier)
  // - last_status_name começa como RECEIVED
  // - statuses deve receber o primeiro status

  const orderId = payload.order_id ?? gerarUUID();
  const storeId = payload.store_id ?? payload.order?.store?.id ?? gerarUUID();

  const createdAt = payload.order?.created_at ?? agoraEmMillis();

  const baseOrder: OrderData = {
    payments: payload.order?.payments ?? [],
    last_status_name: "RECEIVED",
    store: payload.order?.store ?? { id: storeId, name: "Loja não informada" },
    total_price: payload.order?.total_price ?? 0,
    order_id: orderId,
    items: payload.order?.items ?? [],
    created_at: createdAt,
    statuses: [
      {
        created_at: agoraEmMillis(),
        name: "RECEIVED",
        order_id: orderId,
        origin: "SYSTEM",
      },
    ],
    customer: payload.order?.customer ?? { name: "Cliente não informado", temporary_phone: "" },
    delivery_address:
      payload.order?.delivery_address ??
      ({
        reference: null,
        street_name: "",
        postal_code: "",
        country: "BR",
        city: "",
        neighborhood: "",
        street_number: "",
        state: "",
        coordinates: { longitude: 0, latitude: 0, id: 0 },
      } as any),
  };

  const novo: OrderRecord = {
    store_id: storeId,
    order_id: orderId,
    order: baseOrder,
  };

  return inserirPedido(novo);
}

export function updateOrder(orderId: string, payload: Partial<OrderRecord>): OrderRecord | null {
  const atual = buscarPorId(orderId);
  if (!atual) return null;

  // Importante: não deixar quebrar os campos essenciais.
  // Também não vamos permitir alterar o order_id.
  const atualizado: OrderRecord = {
    ...atual,
    store_id: payload.store_id ?? atual.store_id,
    order_id: atual.order_id,
    order: {
      ...atual.order,
      ...payload.order,
      order_id: atual.order.order_id,
      last_status_name: atual.order.last_status_name,
      statuses: atual.order.statuses,
    },
  };

  return atualizarPedido(orderId, atualizado);
}

export function deleteOrder(orderId: string): boolean {
  return removerPedido(orderId);
}

export function updateOrderStatus(orderId: string, newStatusRaw: string): OrderRecord | null {
  const pedido = buscarPorId(orderId);
  if (!pedido) return null;

  if (!isStatusValido(newStatusRaw)) {
    const err = new Error("Status inválido.");
    (err as any).statusCode = 400;
    throw err;
  }

  const newStatus = newStatusRaw as OrderStatus;
  const current = pedido.order.last_status_name;

  // Se já está no mesmo status, não faz nada
  if (current === newStatus) return pedido;

  // Se não pode transicionar, erro 400
  if (!podeTransicionar(current, newStatus)) {
    const err = new Error(`Transição de status inválida: ${current} → ${newStatus}`);
    (err as any).statusCode = 400;
    throw err;
  }

  const atualizado: OrderRecord = {
    ...pedido,
    order: {
      ...pedido.order,
      last_status_name: newStatus,
      statuses: [
        ...pedido.order.statuses,
        {
          created_at: agoraEmMillis(),
          name: newStatus,
          order_id: orderId,
          origin: "SYSTEM",
        },
      ],
    },
  };

  return atualizarPedido(orderId, atualizado);
}
