import { Request, Response } from "express";
import { UpdateProdutoCase } from "./UpdateProdutoCase";

export class UpdateProdutoController {
    async handle( req: Request, res: Response) {

        console.log(req.body);
      
        const {name, section, obs, img, price, qntd, qntd_additional} = req.body


        const updateProdutoCase = new UpdateProdutoCase()

        const result = await updateProdutoCase.execute({
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