import { Request, Response } from "express";
import { UpdateSecaoProdutoCase } from "./UpdateSecaoProdutoCase";

export class UpdateSecaoProdutoController {
  async handle(req: Request, res: Response) {
    const { id, name, possuiAdicionais} = req.body

    const updateSecaoProdutoCase = new UpdateSecaoProdutoCase()

    const updatedSecaoProduto = await updateSecaoProdutoCase.execute({
      id,
      name,
      possuiAdicionais
    })

    return res.status(201).json(updatedSecaoProduto)
  }

}