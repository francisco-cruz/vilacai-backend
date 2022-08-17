import { PrismaClient, SecaoRecheio } from "@prisma/client";
import { AppError } from "../../../../errors/appError";
const prisma = new PrismaClient();

import { UpdateSecaoRecheioDTO } from "../../dtos/UpdateSecaoRecheioDTO";

export class UpdateSecaoRecheioCase {
  async execute({ id, name }: UpdateSecaoRecheioDTO): Promise<SecaoRecheio> {
    // Verificar se a secção do produto existe
    const secaoRecheioAlreadyExists = await prisma.secaoProduto.findUnique({
      where: {
        id,
      },
    });

    if (!secaoRecheioAlreadyExists) {
      throw new AppError("The section does not exists!");
    }

    const updatedSecaoRecheio = await prisma.secaoRecheio.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    return updatedSecaoRecheio;
  }
}
