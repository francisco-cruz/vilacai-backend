import { Request, Response } from "express";
import { DeleteRecheioCase } from "./DeleteRecheioCase";

export class DeleteRecheioController {
  async handle(req: Request, res: Response) {
    const { id } = req.body

    const deleteRecheioCase = new DeleteRecheioCase()

    const deletedRecheio = await deleteRecheioCase.execute({ id })

    return res.status(201).json(deletedRecheio)
  }
}