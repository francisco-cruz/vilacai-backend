const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

import { Request, Response } from "express";

export class ReadSecaoRecheioCase {
  async execute(req: Request, res: Response) {
    const secoesRecheio = await prisma.secaoRecheio.findMany();

    return res.json(secoesRecheio);
  }
}
