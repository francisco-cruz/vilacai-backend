import { Request, Response } from "express";
import { UpdateRecheioCase } from "./UpdateRecheioCase";

export class UpdateRecheioController {
  async handle(req: Request, res: Response) {
    const { id, name, section, qntd_recheio } = req.body

    const updateRecheioCase = new UpdateRecheioCase()

    const updatedRecheio = await updateRecheioCase.execute({
      id,
      name,
      section,
      qntd_recheio
    })

    return res.status(201).json(updatedRecheio)
  }

}