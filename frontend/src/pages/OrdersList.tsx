import React, { useEffect, useMemo, useState } from "react";
import { listarPedidos } from "../api";
import { OrderRecord } from "../types";
import { Badge } from "../components/Badge";

export function OrdersList({
  onSelect,
}: {
  onSelect: (orderId: string) => void;
}) {
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [pedidos, setPedidos] = useState<OrderRecord[]>([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await listarPedidos();
        setPedidos(data);
      } catch (e: any) {
        setErro(e?.message ?? "Erro ao carregar pedidos.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtrados = useMemo(() => {
    const q = busca.trim().toLowerCase();
    if (!q) return pedidos;

    return pedidos.filter((p) => {
      const nome = p.order.customer?.name?.toLowerCase() ?? "";
      const id = p.order_id.toLowerCase();
      const loja = p.order.store?.name?.toLowerCase() ?? "";
      return nome.includes(q) || id.includes(q) || loja.includes(q);
    });
  }, [busca, pedidos]);

  if (loading) return <p>Carregando pedidos...</p>;
  if (erro) return <p style={{ color: "crimson" }}>{erro}</p>;

  return (
    <div>
      <h2 style={{ margin: 0 }}>Pedidos</h2>
      <p style={{ marginTop: 6, color: "#555" }}>
        Clique em um pedido para ver detalhes.
      </p>

      <input
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Buscar por cliente, loja ou ID..."
        style={{
          width: "100%",
          padding: 10,
          borderRadius: 10,
          border: "1px solid #ddd",
          margin: "12px 0 16px",
        }}
      />

      <div style={{ display: "grid", gap: 12 }}>
        {filtrados.map((p) => (
          <button
            key={p.order_id}
            onClick={() => onSelect(p.order_id)}
            style={{
              textAlign: "left",
              padding: 14,
              borderRadius: 16,
              border: "1px solid #e5e5e5",
              background: "white",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
              <strong>{p.order.customer?.name ?? "Cliente"}</strong>
              <Badge status={p.order.last_status_name} />
            </div>

            <div style={{ marginTop: 8, fontSize: 13, color: "#444" }}>
              <div><b>Loja:</b> {p.order.store?.name ?? "-"}</div>
              <div><b>Total:</b> R$ {p.order.total_price.toFixed(2)}</div>
              <div style={{ opacity: 0.7, marginTop: 4 }}>
                <b>ID:</b> {p.order_id}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
