import { Router } from "express";

import {
    CriarReserva,
    CancelarReserva
} from "../controllers/ReservaController.js";


const router = Router();


router.post("/", CriarReserva);
router.delete("/:presenteId", CancelarReserva)


export default router;