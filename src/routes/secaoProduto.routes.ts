import { Router } from "express";
import { CreateSecaoProdutoController } from "../modules/secaoProdutos/secaoProdutoCases/createSecaoProduto/CreateSecaoProdutoController";
import { DeleteSecaoProdutoController } from "../modules/secaoProdutos/secaoProdutoCases/deleteSecaoProduto/DeleteSecaoProdutoController";
import { ReadSecaoProdutoCase } from "../modules/secaoProdutos/secaoProdutoCases/readSecaoProduto/ReadSecaoProdutoCase";
import { UpdateSecaoProdutoController } from "../modules/secaoProdutos/secaoProdutoCases/updateSecaoProduto/UpdateSecaoProdutoController";


const createSecaoProdutoController = new CreateSecaoProdutoController()
const readSecaoProdutoCase = new ReadSecaoProdutoCase()
const  updateSecaoProdutoController = new UpdateSecaoProdutoController
const deleteSecaoProdutoController = new DeleteSecaoProdutoController()
const secaoProdutoRoutes =  Router()

secaoProdutoRoutes.post("/", createSecaoProdutoController.handle)
secaoProdutoRoutes.get("/", readSecaoProdutoCase.execute )
secaoProdutoRoutes.put("/", updateSecaoProdutoController.handle)
secaoProdutoRoutes.delete("/", deleteSecaoProdutoController.handle)



export { secaoProdutoRoutes }
