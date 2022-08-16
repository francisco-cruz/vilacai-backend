import { Request, Response } from "express";
import { CreateProdutoCase } from "./CreateProdutoCase";

export class CreateProdutoController {
    async handle( req: Request, res: Response) {
        const {name, section, obs, img, price, qntd, qntd_additional} = req.body

        const createProdutoCase = new CreateProdutoCase()

        const result = await createProdutoCase.execute({
            name,
            section,
            obs,
            img,
            price,
            qntd,
            qntd_additional
        })

        return res.status(201).json(result)
    }
}