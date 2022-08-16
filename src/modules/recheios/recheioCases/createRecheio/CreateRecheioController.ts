import { Request, Response } from "express";
import { CreateRecheioCase } from "./CreateRecheioCase";

export class CreateRecheioController {
    async handle( req: Request, res: Response) {
        const {name, section} = req.body

        const createRecheioCase = new CreateRecheioCase()

        const result = await createRecheioCase.execute({
            name,
            section
        })

        return res.status(201).json(result)
    }
}