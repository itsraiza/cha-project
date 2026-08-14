import { Router } from "express";

import {
    EstatisticasHome
} from "../controllers/HomeController.js";


const router = Router();


router.get("/", EstatisticasHome);


export default router;