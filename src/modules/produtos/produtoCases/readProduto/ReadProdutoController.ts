import { Request, Response } from "express";
import { ReadProdutoCase } from './readProdutoCase'

export class CreateProdutoController {
  async handle(req: Request, res: Response) {
    const { name, section, obs, img, price, qntd, qntd_additional } = req.body

    const readProdutoCase = new ReadProdutoCase()

    const result = await readProdutoCase.execute({
      name,
      section,
      obs,
      img,
      price,
      qntd,
      qntd_additional
    })

    return res.status(201).json(result)
  }
}