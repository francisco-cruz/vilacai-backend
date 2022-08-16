import { Request, Response } from "express";
import { DeleteProdutoCase } from "./DeleteProdutoCase";

export class DeleteProdutoController {
  async handle(req: Request, res: Response) {
    const { id } = req.body

    const deleteProdutoCase = new DeleteProdutoCase()

    const deletedProduto = await deleteProdutoCase.execute({id})

    return res.status(201).json(deletedProduto)
  }
}