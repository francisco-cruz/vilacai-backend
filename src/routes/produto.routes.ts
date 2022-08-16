import { Router } from "express";
import { CreateProdutoController } from "../modules/produtos/produtoCases/createProduto/CreateProdutoController";
import { ReadProdutoController } from "../modules/produtos/produtoCases/readProduto/ReadProdutoController";
import { UpdateProdutoController } from "../modules/produtos/produtoCases/updateProduto/UpdateProdutoController";

const createProdutoController = new CreateProdutoController()
const readProdutoController = new ReadProdutoController()
const updateProdutoController = new UpdateProdutoController()

const produtoRoutes = Router()

produtoRoutes.post("/", createProdutoController.handle)
produtoRoutes.get("/", readProdutoController.handle)
produtoRoutes.put("/", updateProdutoController.handle)


export { produtoRoutes }

