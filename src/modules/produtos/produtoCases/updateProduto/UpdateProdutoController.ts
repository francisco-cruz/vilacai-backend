import { Request, Response } from "express";
import { UpdateProdutoCase } from "./UpdateProdutoCase";

export class UpdateProdutoController {
  async handle(req: Request, res: Response) {
    const { id, name, section, obs, img, price, qntd, qntd_max_adicionais } = req.body

    const updateProdutoCase = new UpdateProdutoCase()

    const updatedProduto = await updateProdutoCase.execute({
      id,
      name,
      obs,
      img,
      price,
      qntd,
      qntd_max_adicionais
    })

    return res.status(201).json(updatedProduto)
  }
}