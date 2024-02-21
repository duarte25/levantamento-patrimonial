import express from "express"
import ItensController from "../controllers/ItensController.js" 

const router = express.Router()

router
    .post("/cadastrar", ItensController.CadastrarItens)
    .get("/listar", ItensController.ListarItens)
    .delete("/remover/:id", ItensController.RemoverItens)
    
export default router