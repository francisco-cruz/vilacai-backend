import { Router } from "express";
import { CreateProdutoController } from "../modules/produtos/produtoCases/createProduto/CreateProdutoController";
import { DeleteProdutoController } from "../modules/produtos/produtoCases/deleteProduto/DeleteProdutoController";
import { ReadProdutoCase } from "../modules/produtos/produtoCases/readProduto/ReadProdutoCase";
import { ReadProdutosCase } from "../modules/produtos/produtoCases/readProduto/ReadProdutosCase";
import { UpdateProdutoController } from "../modules/produtos/produtoCases/updateProduto/UpdateProdutoController";


const createProdutoController = new CreateProdutoController()
const readProdutoCase = new ReadProdutoCase()
const readProdutosCase = new ReadProdutosCase()
const updateProdutoController = new UpdateProdutoController()
const deleteProdutoController = new DeleteProdutoController()


const produtoRoutes = Router()

produtoRoutes.post("/", createProdutoController.handle)
produtoRoutes.get("/:id", readProdutoCase.execute)
produtoRoutes.get("/", readProdutosCase.execute)
produtoRoutes.put("/:id", updateProdutoController.handle)
produtoRoutes.delete("/:id", deleteProdutoController.handle)


export { produtoRoutes }

