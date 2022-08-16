import { Response, Request } from "express";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



export class UpdateProdutoCase {
  async execute(req: Request, res: Response) {
    
    const {id ,name, section, obs, img, price, qntd, qntd_additional} = req.body;
  
    const updatedProduto = await prisma.produto.update({
      where: {
        id
      },

      data: {
        name,
        section,
        obs,
        img,
        price,
        qntd,
        qntd_additional
      }

    })
    
    return res.json(updatedProduto)
  }
}