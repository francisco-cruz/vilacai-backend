import { Request, Response } from "express";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export class ReadSecaoProdutosCase {
  async execute(req: Request, res: Response) {
    // Ver seções dos produtos
    const secoesProdutos = await prisma.secaoProduto.findMany()

    return res.json(secoesProdutos);
  }
}
