import express from "express";
import cors from "cors";
import ordersRoutes from "./routes/ordersRoutes";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

app.get("/health", (req, res) => {
  return res.status(200).json({ status: "ok" });
});

app.use("/orders", ordersRoutes);

// Handler simples para rota não encontrada
app.use((req, res) => {
  return res.status(404).json({ message: "Rota não encontrada." });
});

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Backend (TS) rodando em http://localhost:${PORT}`);
});
