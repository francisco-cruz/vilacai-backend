import { Router } from "express";
import { CreateSecaoProdutoController } from "../modules/secaoProdutos/secaoProdutoCases/createSecaoProduto/CreateSecaoProdutoController";
import { DeleteSecaoProdutoController } from "../modules/secaoProdutos/secaoProdutoCases/deleteSecaoProduto/DeleteSecaoProdutoController";
import { ReadSecaoProdutoCase } from "../modules/secaoProdutos/secaoProdutoCases/readSecaoProduto/ReadSecaoProdutoCase";


const createSecaoProdutoController = new CreateSecaoProdutoController()
const readSecaoProdutoCase = new ReadSecaoProdutoCase()
const deleteSecaoProdutoController = new DeleteSecaoProdutoController()
const secaoProdutoRoutes =  Router()

secaoProdutoRoutes.post("/", createSecaoProdutoController.handle)
secaoProdutoRoutes.get("/", readSecaoProdutoCase.execute )
secaoProdutoRoutes.delete("/", deleteSecaoProdutoController.handle)



export { secaoProdutoRoutes }
