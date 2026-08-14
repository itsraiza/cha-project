import { Router } from "express";

import {
    CriarCota,
    CancelarCota
} from "../controllers/CotaController.js";


const router = Router();


router.post("/", CriarCota);
router.delete("/:id", CancelarCota)


export default router;