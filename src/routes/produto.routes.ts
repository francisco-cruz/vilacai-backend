import { Router } from "express";
import { CreateProdutoController } from "../modules/produtos/produtoCases/createProduto/CreateProdutoController";
import { DeleteProdutoController } from "../modules/produtos/produtoCases/deleteProduto/DeleteProdutoController";
import { ReadProdutoCase } from "../modules/produtos/produtoCases/readProduto/ReadProdutoCase";
import { UpdateProdutoController } from "../modules/produtos/produtoCases/updateProduto/UpdateProdutoController";


const createProdutoController = new CreateProdutoController()
const readProdutoCase = new ReadProdutoCase()
const updateProdutoController = new UpdateProdutoController()
const deleteProdutoController = new DeleteProdutoController()


const produtoRoutes = Router()

produtoRoutes.post("/", createProdutoController.handle)
produtoRoutes.get("/", readProdutoCase.execute)
produtoRoutes.put("/", updateProdutoController.handle)
produtoRoutes.delete("/", deleteProdutoController.handle)


export { produtoRoutes }

