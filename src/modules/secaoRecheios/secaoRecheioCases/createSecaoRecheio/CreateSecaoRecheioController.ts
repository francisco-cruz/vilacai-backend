import { Request, Response } from "express";
import { CreateSecaoRecheioCase } from "./CreateSecaoRecheioCase";

export class CreateSecaoRecheioController {
  async handle(req: Request, res: Response) {
    const {name} = req.body;

    const createSecaoRecheioCase = new CreateSecaoRecheioCase();

    const secaoRecheio = await createSecaoRecheioCase.execute({
      name,
    });

    return res.status(201).json(secaoRecheio)
  }
}
