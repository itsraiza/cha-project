import {Router} from "express";
import {
    CriarCategorias,
    ListarCategorias,
    AtualizarCategoria,
    DeletarCategoria
} from "../controllers/CategoriaController.js";
import { autenticarAdmin } from "../middlewares/auth.middleware.js"

const router = Router();

router.post("/", autenticarAdmin, CriarCategorias);
router.get("/", ListarCategorias);
router.put("/:id", autenticarAdmin, AtualizarCategoria);
router.delete("/:id", autenticarAdmin, DeletarCategoria);

export default router;