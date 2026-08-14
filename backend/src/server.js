import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import categoriaRoutes from "./routes/categoriaRoutes.js";
import presenteRoutes from "./routes/presenteRoutes.js"
import reservaRoutes from "./routes/reservaRoutes.js";
import mensagemRoutes from "./routes/mensagemRoutes.js"
import presencaRoutes from "./routes/presencaRoutes.js"
import homeRoutes from "./routes/homeRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import cotaRoutes from "./routes/cotaRoutes.js"

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use("/categorias", categoriaRoutes);
app.use("/presentes", presenteRoutes);
app.use("/reservas", reservaRoutes);
app.use("/mensagens", mensagemRoutes);
app.use("/presenca", presencaRoutes);
app.use("/home", homeRoutes);
app.use("/admin", adminRoutes);
app.use("/cotas", cotaRoutes);

app.listen(PORT, () => {
  console.log(`Servido rodando em ${"http://localhost:" + PORT + "/"}`);
});