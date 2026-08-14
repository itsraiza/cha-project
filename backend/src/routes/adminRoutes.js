import { Router } from "express";

import {
    CriarAdmin,
    LoginAdmin,
    DashboardAdmin
} from "../controllers/AdminController.js";
import { autenticarAdmin } from "../middlewares/auth.middleware.js"


const router = Router();


router.get("/dashboard", autenticarAdmin, DashboardAdmin);

router.post("/", CriarAdmin);

router.post("/login", LoginAdmin);


export default router;