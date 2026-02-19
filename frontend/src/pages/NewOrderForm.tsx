import React from "react";
import { criarPedido } from "../api";
import { OrderRecord } from "../types";

function uuidFake() {
    return crypto.randomUUID();
}

export function NewOrderForm({
    onCreated,
}: {
    onCreated: (created: OrderRecord) => void;
}) {
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<string | null>(null);

    // IDs
    const [storeId, setStoreId] = React.useState<string>(uuidFake());
    const [orderId, setOrderId] = React.useState<string>(uuidFake());

    // Loja / Cliente
    const [storeName, setStoreName] = React.useState("Coco Bambu Loja Teste");
    const [customerName, setCustomerName] = React.useState("Cliente Teste");
    const [customerPhone, setCustomerPhone] = React.useState("+556199999999");

    // Item (1 item)
    const [itemCode, setItemCode] = React.useState(1001);
    const [itemName, setItemName] = React.useState("Camarao Alfredo");
    const [itemQuantity, setItemQuantity] = React.useState(1);
    const [itemPrice, setItemPrice] = React.useState(89.9);
    const [itemObs, setItemObs] = React.useState("Sem cebola");
    const [itemDiscount, setItemDiscount] = React.useState(0);

    // Endereço
    const [streetName, setStreetName] = React.useState("Rua das Pitangueiras");
    const [streetNumber, setStreetNumber] = React.useState("1050");
    const [neighborhood, setNeighborhood] = React.useState("Águas Claras");
    const [city, setCity] = React.useState("Brasília");
    const [state, setState] = React.useState("Distrito Federal");
    const [postalCode, setPostalCode] = React.useState("71.900-100");
    const [reference, setReference] = React.useState("Portão A");

    // Coordenadas
    const [lat, setLat] = React.useState(-15.835);
    const [lng, setLng] = React.useState(-48.025);

    // Pagamento
    const [paymentOrigin, setPaymentOrigin] = React.useState("CREDIT_CARD");
    const [paymentPrepaid, setPaymentPrepaid] = React.useState(true);

    const total = Number(itemQuantity) * Number(itemPrice) - Number(itemDiscount);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!storeName.trim()) return setError("Informe o nome da loja.");
        if (!customerName.trim()) return setError("Informe o nome do cliente.");
        if (!orderId.trim()) return setError("Informe o order_id.");
        if (!storeId.trim()) return setError("Informe o store_id.");
        if (!itemName.trim()) return setError("Informe o nome do item.");
        if (itemQuantity <= 0) return setError("Quantidade deve ser maior que 0.");
        if (itemPrice <= 0) return setError("Preço deve ser maior que 0.");

        const now = Date.now();

        const payload = {
            store_id: storeId,
            order_id: orderId,
            order: {
                payments: [
                    {
                        prepaid: paymentPrepaid,
                        value: total,
                        origin: paymentOrigin,
                    },
                ],
                last_status_name: "RECEIVED",
                store: {
                    name: storeName.trim(),
                    id: storeId,
                },
                total_price: total,
                order_id: orderId,
                items: [
                    {
                        code: Number(itemCode),
                        price: Number(itemPrice),
                        observations: itemObs.trim() ? itemObs.trim() : null,
                        total_price: total,
                        name: itemName.trim(),
                        quantity: Number(itemQuantity),
                        discount: Number(itemDiscount),
                        condiments: [],
                    },
                ],
                created_at: now,
                statuses: [
                    {
                        created_at: now,
                        name: "RECEIVED",
                        order_id: orderId,
                        origin: "SYSTEM",
                    },
                ],
                customer: {
                    temporary_phone: customerPhone.trim(),
                    name: customerName.trim(),
                },
                delivery_address: {
                    reference: reference.trim() ? reference.trim() : null,
                    street_name: streetName.trim(),
                    postal_code: postalCode.trim(),
                    country: "BR",
                    city: city.trim(),
                    neighborhood: neighborhood.trim(),
                    street_number: streetNumber.trim(),
                    state: state.trim(),
                    coordinates: {
                        longitude: Number(lng),
                        latitude: Number(lat),
                        id: Math.floor(Math.random() * 9999999),
                    },
                },
            },
        };

        setSaving(true);
        try {
            const created = await criarPedido(payload as any);
            setSuccess("Pedido criado com sucesso!");
            onCreated(created);

            // gera novos IDs pro próximo pedido
            setStoreId(uuidFake());
            setOrderId(uuidFake());
        } catch (e: any) {
            setError(e?.message ?? "Erro ao criar pedido.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div
            style={{
                border: "1px solid #e5e7eb",
                borderRadius: 16,
                padding: 14,
                background: "white",
            }}
        >
            <h3 style={{ marginTop: 0 }}>➕ Criar Pedido</h3>

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
                <div style={{ display: "grid", gap: 8 }}>
                    <b>Identificadores</b>

                    <input
                        value={storeId}
                        onChange={(e) => setStoreId(e.currentTarget.value)}
                        placeholder="store_id"
                        style={inputStyle}
                    />

                    <input
                        value={orderId}
                        onChange={(e) => setOrderId(e.currentTarget.value)}
                        placeholder="order_id"
                        style={inputStyle}
                    />
                </div>

                <div style={{ display: "grid", gap: 8 }}>
                    <b>Loja</b>

                    <input
                        value={storeName}
                        onChange={(e) => setStoreName(e.currentTarget.value)}
                        placeholder="Nome da loja"
                        style={inputStyle}
                    />
                </div>

                <div style={{ display: "grid", gap: 8 }}>
                    <b>Cliente</b>

                    <input
                        value={customerName}
                        onChange={(e) => setCustomerName(e.currentTarget.value)}
                        placeholder="Nome do cliente"
                        style={inputStyle}
                    />

                    <input
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.currentTarget.value)}
                        placeholder="Telefone"
                        style={inputStyle}
                    />
                </div>

                <div style={{ display: "grid", gap: 8 }}>
                    <b>Item (1 item)</b>

                    <div style={{ display: "flex", gap: 10 }}>
                        <input
                            type="number"
                            value={itemCode}
                            onChange={(e) => setItemCode(Number(e.currentTarget.value))}
                            placeholder="Code"
                            style={{ ...inputStyle, flex: 1 }}
                        />

                        <input
                            type="number"
                            value={itemQuantity}
                            onChange={(e) => setItemQuantity(Number(e.currentTarget.value))}
                            placeholder="Quantidade"
                            style={{ ...inputStyle, flex: 1 }}
                        />

                        <input
                            type="number"
                            value={itemPrice}
                            onChange={(e) => setItemPrice(Number(e.currentTarget.value))}
                            placeholder="Preço"
                            style={{ ...inputStyle, flex: 1 }}
                        />
                    </div>

                    <input
                        value={itemName}
                        onChange={(e) => setItemName(e.currentTarget.value)}
                        placeholder="Nome do item"
                        style={inputStyle}
                    />

                    <input
                        value={itemObs}
                        onChange={(e) => setItemObs(e.currentTarget.value)}
                        placeholder="Observações (ex: sem cebola)"
                        style={inputStyle}
                    />

                    <input
                        type="number"
                        value={itemDiscount}
                        onChange={(e) => setItemDiscount(Number(e.currentTarget.value))}
                        placeholder="Desconto"
                        style={inputStyle}
                    />

                    <div style={{ fontSize: 13, opacity: 0.75 }}>
                        <b>Total calculado:</b> R$ {total.toFixed(2)}
                    </div>
                </div>

                <div style={{ display: "grid", gap: 8 }}>
                    <b>Pagamento</b>

                    <select
                        value={paymentOrigin}
                        onChange={(e) => setPaymentOrigin(e.currentTarget.value)}
                        style={inputStyle}
                    >
                        <option value="CREDIT_CARD">CREDIT_CARD</option>
                        <option value="PIX">PIX</option>
                        <option value="CASH">CASH</option>
                        <option value="VR">VR</option>
                    </select>

                    <label style={{ fontSize: 13, display: "flex", gap: 8, alignItems: "center" }}>
                        <input
                            type="checkbox"
                            checked={paymentPrepaid}
                            onChange={(e) => setPaymentPrepaid(e.currentTarget.checked)}
                        />
                        Pagamento pré-pago
                    </label>
                </div>

                <div style={{ display: "grid", gap: 8 }}>
                    <b>Endereço de entrega</b>

                    <input
                        value={streetName}
                        onChange={(e) => setStreetName(e.currentTarget.value)}
                        placeholder="Rua"
                        style={inputStyle}
                    />

                    <input
                        value={streetNumber}
                        onChange={(e) => setStreetNumber(e.currentTarget.value)}
                        placeholder="Número"
                        style={inputStyle}
                    />

                    <input
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.currentTarget.value)}
                        placeholder="Bairro"
                        style={inputStyle}
                    />

                    <div style={{ display: "flex", gap: 10 }}>
                        <input
                            value={city}
                            onChange={(e) => setCity(e.currentTarget.value)}
                            placeholder="Cidade"
                            style={{ ...inputStyle, flex: 1 }}
                        />
                        <input
                            value={state}
                            onChange={(e) => setState(e.currentTarget.value)}
                            placeholder="Estado"
                            style={{ ...inputStyle, flex: 1 }}
                        />
                    </div>

                    <div style={{ display: "flex", gap: 10 }}>
                        <input
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.currentTarget.value)}
                            placeholder="CEP"
                            style={{ ...inputStyle, flex: 1 }}
                        />
                        <input
                            value={reference}
                            onChange={(e) => setReference(e.currentTarget.value)}
                            placeholder="Referência"
                            style={{ ...inputStyle, flex: 1 }}
                        />
                    </div>

                    <div style={{ display: "flex", gap: 10 }}>
                        <input
                            type="number"
                            value={lat}
                            onChange={(e) => setLat(Number(e.currentTarget.value))}
                            placeholder="Latitude"
                            style={{ ...inputStyle, flex: 1 }}
                        />
                        <input
                            type="number"
                            value={lng}
                            onChange={(e) => setLng(Number(e.currentTarget.value))}
                            placeholder="Longitude"
                            style={{ ...inputStyle, flex: 1 }}
                        />
                    </div>
                </div>

                <button disabled={saving} type="submit" style={buttonStyle(saving)}>
                    {saving ? "Criando..." : "Criar Pedido"}
                </button>

                {error && <div style={{ color: "#ef4444", fontSize: 13 }}>{error}</div>}
                {success && <div style={{ color: "#16a34a", fontSize: 13 }}>{success}</div>}
            </form>

            <div style={{ marginTop: 10, fontSize: 12, opacity: 0.7 }}>
            </div>
        </div>
    );
}

const inputStyle: React.CSSProperties = {
    padding: 10,
    borderRadius: 12,
    border: "1px solid #e5e7eb",
};

const buttonStyle = (saving: boolean): React.CSSProperties => ({
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    background: saving ? "#f1f5f9" : "white",
    cursor: saving ? "not-allowed" : "pointer",
    fontWeight: 700,
});
