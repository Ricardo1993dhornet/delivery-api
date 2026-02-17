import { Router } from "express";
import {
  atualizar,
  atualizarStatus,
  buscar,
  criar,
  listar,
  remover,
} from "../controllers/ordersController";

const router = Router();

router.get("/", listar);
router.get("/:order_id", buscar);
router.post("/", criar);
router.put("/:order_id", atualizar);
router.delete("/:order_id", remover);
router.patch("/:order_id/status", atualizarStatus);

export default router;
