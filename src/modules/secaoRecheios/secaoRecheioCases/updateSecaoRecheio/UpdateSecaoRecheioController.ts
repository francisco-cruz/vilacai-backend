import { Request, Response } from "express";
import { UpdateSecaoProdutoCase } from "../../../secaoProdutos/secaoProdutoCases/updateSecaoProduto/UpdateSecaoProdutoCase";
import { UpdateSecaoRecheioCase } from "./UpdateSecaoRecheioCase";

export class UpdateSecaoRecheioController {
  async handle(req: Request, res: Response) {
    const { id, name } = req.body;

    const updateSecaoRecheioCase = new UpdateSecaoRecheioCase();

    const updatedSecaoRecheio = await updateSecaoRecheioCase.execute({
      id,
      name,
    });

    return res.status(201).json(updatedSecaoRecheio)
  }
}
