const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

import { Request, Response } from "express";

export class ReadSecaoRecheioCase {
  async execute(req: Request, res: Response) {
    const secoesRecheio = await prisma.secaoRecheio.findUnique({
      where: {
        id: req.params.id
      },

    })

    return res.json(secoesRecheio);
  }
}
