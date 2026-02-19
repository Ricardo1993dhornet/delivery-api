import React, { useState } from "react";
import { OrdersList } from "./pages/OrdersList";
import { OrderDetails } from "./pages/OrderDetails";

export default function App() {
  const [selecionado, setSelecionado] = useState<string | null>(null);

  return (
    <div
      style={{
        maxWidth: 980,
        margin: "0 auto",
        padding: 20,
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial",
      }}
    >
      <header style={{ marginBottom: 18 }}>
        <h1 style={{ margin: 0 }}>Delivery API</h1>
        <p style={{ marginTop: 6, color: "#555" }}>
          Interface simples para visualizar e atualizar pedidos.
        </p>
      </header>

      <main>
        {selecionado ? (
          <OrderDetails orderId={selecionado} onBack={() => setSelecionado(null)} />
        ) : (
          <OrdersList onSelect={(id) => setSelecionado(id)} />
        )}
      </main>

      <footer style={{ marginTop: 24, opacity: 0.7, fontSize: 12 }}>
      </footer>
    </div>
  );
}
