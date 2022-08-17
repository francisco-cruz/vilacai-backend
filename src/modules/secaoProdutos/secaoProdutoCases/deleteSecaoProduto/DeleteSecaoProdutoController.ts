import { Request, Response } from "express";
import { DeleteSecaoProdutoCase} from "./DeleteSecaoProdutoCase";

export class DeleteSecaoProdutoController {
  async handle(req: Request, res: Response) {
    const { id } = req.body

    const deleteSecaoProdutoCase = new DeleteSecaoProdutoCase()

    const deletedSecaoProduto = await deleteSecaoProdutoCase.execute({ id })

    return res.status(201).json(deletedSecaoProduto)
  }
}