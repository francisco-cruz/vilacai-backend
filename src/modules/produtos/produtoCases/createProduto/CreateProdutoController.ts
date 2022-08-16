import { Request, Response } from "express";
import { CreateProdutoCase } from "./CreateProdutoCase";

export class CreateProdutoController {
  async handle(req: Request, res: Response) {
    const { name, obs, img, price, qntd, qntd_max_adicionais } = req.body

    const createProdutoCase = new CreateProdutoCase()

    const result = await createProdutoCase.execute({
      name,
      obs,
      img,
      price,
      qntd,
      qntd_max_adicionais
    })

    return res.status(201).json(result)
  }
}