import { PrismaClient, SecaoRecheio } from "@prisma/client";
const prisma = new PrismaClient();

import { AppError } from "../../../../errors/appError";
import { CreateSecaoRecheioDTO } from "../../dtos/CreateSecaoRecheioDTO";

export class CreateSecaoRecheioCase {
  async execute({ name }: CreateSecaoRecheioDTO): Promise<SecaoRecheio> {
    // Verificar se a secao já existe
    const secaoRecheioAlreadyExists = await prisma.secaoRecheio.findUnique({
      where: {
        name
      },
    });

    if (secaoRecheioAlreadyExists) {
      throw new AppError("The section already exists!");
    }

    const secaoRecheio = await prisma.secaoRecheio.create({
      data: {
        name,
      },
    });

    return secaoRecheio;
  }
}
