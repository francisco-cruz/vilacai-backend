import { Router } from "express";
import { CreateSecaoProdutoController } from "../modules/secaoProdutos/secaoProdutoCases/createSecaoProduto/CreateSecaoProdutoController";
import { DeleteSecaoProdutoController } from "../modules/secaoProdutos/secaoProdutoCases/deleteSecaoProduto/DeleteSecaoProdutoController";
import { ReadSecaoProdutoCase } from "../modules/secaoProdutos/secaoProdutoCases/readSecaoProduto/ReadSecaoProdutoCase";
import { ReadSecaoProdutosCase } from "../modules/secaoProdutos/secaoProdutoCases/readSecaoProduto/ReadSecaoProdutosCase";
import { UpdateSecaoProdutoController } from "../modules/secaoProdutos/secaoProdutoCases/updateSecaoProduto/UpdateSecaoProdutoController";


const createSecaoProdutoController = new CreateSecaoProdutoController()
const readSecaoProdutoCase = new ReadSecaoProdutoCase()
const readSecaoProdutosCase = new ReadSecaoProdutosCase()
const updateSecaoProdutoController = new UpdateSecaoProdutoController
const deleteSecaoProdutoController = new DeleteSecaoProdutoController()
const secaoProdutoRoutes =  Router()

secaoProdutoRoutes.post("/", createSecaoProdutoController.handle)
secaoProdutoRoutes.get("/", readSecaoProdutosCase.execute )
secaoProdutoRoutes.get("/:id", readSecaoProdutoCase.execute )
secaoProdutoRoutes.put("/:id", updateSecaoProdutoController.handle)
secaoProdutoRoutes.delete("/:id", deleteSecaoProdutoController.handle)



export { secaoProdutoRoutes }
