import { Response, Request } from "express";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export class ReadProdutoCase {
  async execute(req: Request, res: Response) {
    // Ver produtos
    const produtos = await prisma.produto.findMany()

    return res.json(produtos)

  }
}