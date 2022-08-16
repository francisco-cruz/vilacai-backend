import { Response, Request } from "express";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export class DeleteProdutoCase {
  async execute(req: Request, res: Response) {
    const {id} = req.body;

    const deleteProduto = await prisma.produto.delete({
      where: {
        id
      },
    })

    return res.json(deleteProduto)

}
}