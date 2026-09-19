import { Router } from "express";

import {
    CriarReserva,
    ListarReservas,
    CancelarReserva
} from "../controllers/ReservaController.js";


const router = Router();


router.post("/", CriarReserva);
router.get("/", ListarReservas);
router.delete("/:presenteId", CancelarReserva)


export default router;