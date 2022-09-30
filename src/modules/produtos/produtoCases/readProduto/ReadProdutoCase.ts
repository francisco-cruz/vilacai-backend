import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export class ReadProdutoCase {
  async execute(req: Request, res: Response) {
    // Ver produto pelo id
    const produto = await prisma.produto.findUnique({
      where: {
        id: req.params.id
      },
      include: {
        secao: true
      }
    })

    return res.json(produto)

  }
}