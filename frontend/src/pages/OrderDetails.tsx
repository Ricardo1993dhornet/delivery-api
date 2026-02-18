import React, { useEffect, useState } from "react";
import { atualizarStatus, buscarPedido } from "../api";
import { Badge } from "../components/Badge";
import { OrderRecord, OrderStatus } from "../types";
import { deletarPedido } from "../api";


const transicoes: Record<OrderStatus, OrderStatus[]> = {
  RECEIVED: ["CONFIRMED", "CANCELED"],
  CONFIRMED: ["DISPATCHED", "CANCELED"],
  DISPATCHED: ["DELIVERED", "CANCELED"],
  DELIVERED: [],
  CANCELED: [],
};

export function OrderDetails({
  orderId,
  onBack,
}: {
  orderId: string;
  onBack: () => void;
}) {
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [pedido, setPedido] = useState<OrderRecord | null>(null);
  const [acaoLoading, setAcaoLoading] = useState(false);

  async function carregar() {
    try {
      setLoading(true);
      const data = await buscarPedido(orderId);
      setPedido(data);
    } catch (e: any) {
      setErro(e?.message ?? "Erro ao carregar pedido.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);


  async function handleDelete() {
    const ok = confirm("Tem certeza que deseja deletar este pedido?");
    if (!ok) return;

    try {
      await deletarPedido(orderId);
      alert("Pedido deletado com sucesso!");

      // recarrega a página (simples e funciona)
      window.location.reload();
    } catch (e: any) {
      alert(e?.message ?? "Erro ao deletar pedido.");
    }
  }

  async function mudarStatus(s: OrderStatus) {
    try {
      setAcaoLoading(true);
      const atualizado = await atualizarStatus(orderId, s);
      setPedido(atualizado);
    } catch (e: any) {
      alert(e?.message ?? "Erro ao atualizar status.");
    } finally {
      setAcaoLoading(false);
    }
  }

  if (loading) return <p>Carregando detalhes...</p>;
  if (erro) return <p style={{ color: "crimson" }}>{erro}</p>;
  if (!pedido) return <p>Pedido não encontrado.</p>;

  const statusAtual = pedido.order.last_status_name;
  const opcoes = transicoes[statusAtual];

  return (
    <div>
      <button
        onClick={onBack}
        style={{
          border: "1px solid #ddd",
          padding: "8px 12px",
          borderRadius: 12,
          background: "white",
          cursor: "pointer",
          marginBottom: 12,
        }}
      >
        ← Voltar
      </button>

      <h2 style={{ margin: 0 }}>Detalhes do Pedido</h2>

      <div style={{ marginTop: 10 }}>
        <Badge status={statusAtual} />
      </div>

      <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
        <div><b>Cliente:</b> {pedido.order.customer.name}</div>
        <div><b>Telefone:</b> {pedido.order.customer.temporary_phone}</div>
        <div><b>Loja:</b> {pedido.order.store.name}</div>
        <div><b>Total:</b> R$ {pedido.order.total_price.toFixed(2)}</div>
        <div style={{ opacity: 0.7 }}><b>ID:</b> {pedido.order_id}</div>
      </div>

      <h3 style={{ marginTop: 22 }}>Ações</h3>
      {opcoes.length === 0 ? (
        <p style={{ color: "#555" }}>Este pedido já está em um estado final.</p>
      ) : (
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {opcoes.map((s) => (
            <button
              key={s}
              onClick={() => mudarStatus(s)}
              disabled={acaoLoading}
              style={{
                border: "1px solid #ddd",
                padding: "10px 14px",
                borderRadius: 14,
                background: "white",
                cursor: "pointer",
                opacity: acaoLoading ? 0.6 : 1,
              }}
            >
              Alterar para: {s}
            </button>

          ))}
          <button
            onClick={handleDelete}
            disabled={acaoLoading}
            style={{
              padding: "10px 14px",
              borderRadius: 12,
              border: "1px solid #ddd",
              background: "white",
              cursor: "pointer",
              fontWeight: 700,
              color: "#ef4444",
              marginTop: 14,
              opacity: acaoLoading ? 0.6 : 1,
            }}
          >
            Deletar Pedido
          </button>

        </div>
      )}

      <h3 style={{ marginTop: 22 }}>Itens</h3>
      <div style={{ display: "grid", gap: 10 }}>
        {pedido.order.items.map((it, idx) => (
          <div
            key={idx}
            style={{
              border: "1px solid #eee",
              borderRadius: 14,
              padding: 12,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <b>{it.name}</b>
              <span>
                R$ {(it.total_price ?? (it.price * it.quantity)).toFixed(2)}
              </span>

            </div>
            <div style={{ marginTop: 6, color: "#555", fontSize: 13 }}>
              <div><b>Qtd:</b> {it.quantity ?? it.quantity}</div>
              <div><b>Obs:</b> {it.observations ?? it.observations ?? "-"}</div>
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: 22 }}>Histórico de Status</h3>
      <div style={{ display: "grid", gap: 8 }}>
        {pedido.order.statuses.map((st, idx) => (
          <div
            key={idx}
            style={{
              border: "1px solid #eee",
              borderRadius: 14,
              padding: 10,
              display: "flex",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <span><b>{st.name}</b></span>
            <span style={{ opacity: 0.7 }}>{new Date(st.created_at).toLocaleString("pt-BR")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
