import { Router } from "express";

import {
    CriarMensagem,
    ListarMensagens,
    AtualizarMensagem,
    DeletarMensagem
} from "../controllers/MensagemController.js";


const router = Router();


router.post("/", CriarMensagem);

router.get("/", ListarMensagens);

router.put("/:id", AtualizarMensagem);

router.delete("/:id", DeletarMensagem);


export default router;