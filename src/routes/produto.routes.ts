import { Router } from "express";
import { CreateProdutoController } from "../modules/produtos/produtoCases/createProduto/CreateProdutoController";
import { DeleteProdutoCase } from "../modules/produtos/produtoCases/deleteProduto/DeleteProdutoCase";
import { ReadProdutoCase } from "../modules/produtos/produtoCases/readProduto/ReadProdutoCase";

import { UpdateProdutoCase } from "../modules/produtos/produtoCases/updateProduto/UpdateProdutoCase";

const createProdutoController = new CreateProdutoController()
const readProdutoCase = new ReadProdutoCase()
const updateProdutoCase = new UpdateProdutoCase()
const deleteProdutoCase = new DeleteProdutoCase()

const produtoRoutes = Router()

produtoRoutes.post("/", createProdutoController.handle)
produtoRoutes.put("/", updateProdutoCase.execute)
produtoRoutes.get("/", readProdutoCase.execute)
produtoRoutes.delete("/", deleteProdutoCase.execute)


export { produtoRoutes }

