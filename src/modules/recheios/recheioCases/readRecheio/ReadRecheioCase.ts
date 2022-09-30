import { Request, Response } from "express";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export class ReadRecheioCase {
  async execute(req: Request, res: Response) {
    // Ver recheios
      const recheio = await prisma.produto.findUnique({
        where: {
          id: req.params.id
        },
        
        include: {
          secao: true
        }
      })
  
    return res.json(recheio)
  }
}