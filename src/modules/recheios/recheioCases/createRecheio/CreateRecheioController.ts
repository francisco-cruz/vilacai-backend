import { Request, Response } from "express";
import { CreateRecheioCase } from "./CreateRecheioCase";

export class CreateRecheioController {
    async handle( req: Request, res: Response) {
        const {name, section, qntd_recheio} = req.body

        const createRecheioCase = new CreateRecheioCase()

        const result = await createRecheioCase.execute({
            name,
            section,
            qntd_recheio
        })

        return res.status(201).json(result)
    }
}