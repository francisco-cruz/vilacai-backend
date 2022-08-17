import { Request, Response } from "express";
import { CreateProdutoCase } from "./CreateProdutoCase";

export class CreateProdutoController {
  async handle(req: Request, res: Response) {
    const {id, name, obs, img, price, qntd_max_adicionais, id_secao } =
      req.body;

    const createProdutoCase = new CreateProdutoCase();

    const result = await createProdutoCase.execute({
      id,
      name,
      obs,
      img,
      price,
      qntd_max_adicionais,
      id_secao,
    });

    return res.status(201).json(result);
  }
}
