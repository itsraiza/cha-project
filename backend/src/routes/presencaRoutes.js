import { Router } from "express";

import {
    ConfirmarPresenca,
    ListarPresencas,
    AtualizarPresenca,
    CancelarPresenca
} from "../controllers/PresencaController.js";
import { autenticarAdmin } from "../middlewares/auth.middleware.js"


const router = Router();


router.post("/", ConfirmarPresenca);

router.get("/", autenticarAdmin, ListarPresencas);

router.put("/:id", AtualizarPresenca)

router.delete("/:id", CancelarPresenca)


export default router;