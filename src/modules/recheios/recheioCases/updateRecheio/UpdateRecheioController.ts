import { Request, Response } from "express";
import { UpdateRecheioCase } from "./UpdateRecheioCase";

export class UpdateRecheioController {
  async handle(req: Request, res: Response) {
    const { id, name, section } = req.body

    const updateRecheioCase = new UpdateRecheioCase()


    const updatedProduto = await updateRecheioCase.execute({
      id,
      name,
      section,
    })

    return res.status(201).json(updatedProduto)
  }

}