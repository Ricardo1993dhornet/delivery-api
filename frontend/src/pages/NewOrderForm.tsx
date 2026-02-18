import React from "react";
import { criarPedido } from "../api";
import { OrderRecord } from "../types";

export function NewOrderForm({
    onCreated,
}: {
    onCreated: (created: OrderRecord) => void;
}) {
    const [orderId, setOrderId] = React.useState("");
    const [storeName, setStoreName] = React.useState("");
    const [itemName, setItemName] = React.useState("");
    const [itemQty, setItemQty] = React.useState(1);
    const [itemPrice, setItemPrice] = React.useState(10);
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!orderId.trim()) return setError("Informe o order_id.");
        if (!storeName.trim()) return setError("Informe o nome da loja.");
        if (!itemName.trim()) return setError("Informe o nome do item.");
        if (itemQty <= 0) return setError("Quantidade deve ser maior que 0.");
        if (itemPrice <= 0) return setError("Preço deve ser maior que 0.");

        const total = Number(itemQty) * Number(itemPrice);

        setSaving(true);
        try {
            const created = await criarPedido({
                order_id: orderId.trim(),
                order: {
                    store: { name: storeName.trim() },
                    items: [
                        {
                            name: itemName.trim(),
                            qty: Number(itemQty),
                            price: Number(itemPrice),
                        },
                    ],
                    total_price: total,
                },
            });

            setSuccess("Pedido criado com sucesso!");
            onCreated(created);

            // limpar
            setOrderId("");
            setStoreName("");
            setItemName("");
            setItemQty(1);
            setItemPrice(10);
        } catch (e: any) {
            setError(e?.message ?? "Erro ao criar pedido.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 14, background: "white" }}>
            <h3 style={{ marginTop: 0 }}>➕ Novo Pedido</h3>

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
                <input
                    placeholder="order_id (ex: order_002)"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
                />

                <input
                    placeholder="Nome da loja"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
                />

                <input
                    placeholder="Nome do item"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
                />

                <div style={{ display: "flex", gap: 10 }}>
                    <input
                        type="number"
                        placeholder="Qtd"
                        value={itemQty}
                        onChange={(e) => setItemQty(Number(e.target.value))}
                        style={{ flex: 1, padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
                    />

                    <input
                        type="number"
                        placeholder="Preço"
                        value={itemPrice}
                        onChange={(e) => setItemPrice(Number(e.target.value))}
                        style={{ flex: 1, padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
                    />
                </div>

                <button
                    disabled={saving}
                    type="submit"
                    style={{
                        padding: "10px 14px",
                        borderRadius: 12,
                        border: "1px solid #e5e7eb",
                        background: saving ? "#f1f5f9" : "white",
                        cursor: saving ? "not-allowed" : "pointer",
                        fontWeight: 700,
                    }}
                >
                    {saving ? "Criando..." : "Criar Pedido"}
                </button>

                {error && <div style={{ color: "#ef4444", fontSize: 13 }}>{error}</div>}
                {success && <div style={{ color: "#16a34a", fontSize: 13 }}>{success}</div>}
            </form>

            <div style={{ marginTop: 10, fontSize: 12, opacity: 0.7 }}>
                Obs: este formulário cria um pedido com 1 item (depois dá pra evoluir para múltiplos itens).
            </div>
        </div>
    );
}
