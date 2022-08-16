import { Request, Response } from "express";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export class ReadRecheioCase {
  async execute(req: Request, res: Response) {
    // Ver recheios
    const recheios = await prisma.recheio.findMany()

    return res.json(recheios)

  }
}