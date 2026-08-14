import { Router } from "express";
import {
    CriarPresentes,
    ListarPresentes,
    AtualizarPresente,
    DeletarPresente
} from "../controllers/PresenteController.js";
import { autenticarAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", autenticarAdmin, CriarPresentes);

router.get("/", ListarPresentes);

router.put("/:id", autenticarAdmin, AtualizarPresente);

router.delete("/:id", autenticarAdmin, DeletarPresente);

export default router;