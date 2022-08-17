import { Request, Response } from "express";
import { DeleteSecaoRecheioCase } from "./DeleteSecaoRecheioCase";

export class DeleteSecaoRecheioController {
  async handle(req: Request, res: Response) {
    const { id } = req.body;

    const deleteSecaoRecheioCase = new DeleteSecaoRecheioCase();
    const deletedSecaoRecheio = await deleteSecaoRecheioCase.execute({ id });

    return res.status(201).json(deletedSecaoRecheio);
  }
}
