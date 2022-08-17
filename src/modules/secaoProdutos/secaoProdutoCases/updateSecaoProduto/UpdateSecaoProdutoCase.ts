const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import { SecaoProduto } from "@prisma/client";
import { AppError } from "../../../../errors/appError";
import { UpdateSecaoProdutoDTO } from "../../dtos/UpdateSecaoProdutoDTO";

export class UpdateSecaoProdutoCase {
  async execute({
    id,
    name,
    possuiAdicionais,
  }: UpdateSecaoProdutoDTO): Promise<SecaoProduto> {
    // Verificar se a secção do produto existe
    const secaoProdutoAlreadyExists = await prisma.secaoProduto.findUnique({
      where: {
        id,
      },
    });

    if (!secaoProdutoAlreadyExists) {
      throw new AppError("The section does not exists!");
    }

    const updatedSecaoProduto = await prisma.secaoProduto.update({
      where: {
        id,
      },
      data: {
        name,
        possuiAdicionais,
      },
    });

    return updatedSecaoProduto;
  }
}
