import { Request, Response } from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  updateOrderStatus,
} from "../services/ordersService";

export function listar(req: Request, res: Response) {
  const pedidos = getAllOrders();
  return res.status(200).json(pedidos);
}

export function buscar(req: Request, res: Response) {
  const { order_id } = req.params;

  const pedido = getOrderById(order_id);
  if (!pedido) {
    return res.status(404).json({ message: "Pedido não encontrado." });
  }

  return res.status(200).json(pedido);
}

export function criar(req: Request, res: Response) {
  const novo = createOrder(req.body);
  return res.status(201).json(novo);
}

export function atualizar(req: Request, res: Response) {
  const { order_id } = req.params;

  const atualizado = updateOrder(order_id, req.body);
  if (!atualizado) {
    return res.status(404).json({ message: "Pedido não encontrado." });
  }

  return res.status(200).json(atualizado);
}

export function remover(req: Request, res: Response) {
  const { order_id } = req.params;

  const ok = deleteOrder(order_id);
  if (!ok) {
    return res.status(404).json({ message: "Pedido não encontrado." });
  }

  return res.status(204).send();
}

export function atualizarStatus(req: Request, res: Response) {
  const { order_id } = req.params;
  const { new_status } = req.body as { new_status?: string };

  if (!new_status) {
    return res.status(400).json({ message: "Campo obrigatório: new_status" });
  }

  const pedido = getOrderById(order_id);
  if (!pedido) {
    return res.status(404).json({ message: "Pedido não encontrado." });
  }

  try {
    const atualizado = updateOrderStatus(order_id, new_status);
    return res.status(200).json(atualizado);
  } catch (err: any) {
    const code = err?.statusCode ?? 500;
    return res.status(code).json({ message: err?.message ?? "Erro interno." });
  }
}
