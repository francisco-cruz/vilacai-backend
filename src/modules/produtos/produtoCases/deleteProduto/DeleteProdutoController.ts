import { Request, Response } from "express";
import { DeleteProdutoCase } from "./DeleteProdutoCase";

export class DeleteProdutoController {
  async handle(req: Request, res: Response) {
    const { id } = req.body

    const updateProdutoCase = new DeleteProdutoCase()

    const deletedProduto = await updateProdutoCase.execute({id})

    return res.status(201).json(deletedProduto)
  }
}