import { Request, Response } from "express";
import { CreateSecaoProdutoCase } from "./CreateSecaoProdutoCase";

export class CreateSecaoProdutoController {
  async handle(req: Request, res: Response) {
    const { name, possuiAdicionais } = req.body;

    const createSecaoProdutoCase = new CreateSecaoProdutoCase();

    const result = await createSecaoProdutoCase.execute({
      name,
      possuiAdicionais,
    });

    return res.status(201).json(result);
  }
}
