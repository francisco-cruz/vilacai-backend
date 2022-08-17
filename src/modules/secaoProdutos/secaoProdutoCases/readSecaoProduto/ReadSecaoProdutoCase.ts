import { Request, Response } from "express";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export class ReadSecaoProdutoCase {
  async execute(req: Request, res: Response) {
    // Ver secão dos produtos
    const secoesProduto = await prisma.secaoProduto.findMany()

    return res.json(secoesProduto);
  }
}
