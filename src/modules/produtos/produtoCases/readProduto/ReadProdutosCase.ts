import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export class ReadProdutosCase {
  async execute(req: Request, res: Response) {
    // Ver produtos
    const produtos = await prisma.produto.findMany({
   
      include: {
        secao: true
      }
    })

    return res.json(produtos)

  }
}