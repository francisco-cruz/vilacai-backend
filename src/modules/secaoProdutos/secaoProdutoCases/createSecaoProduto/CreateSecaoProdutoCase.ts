const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

import { SecaoProduto } from "@prisma/client";
import { AppError } from "../../../../errors/appError";
import { SecaoProdutoDTO } from "../../dtos/SecaoProdutoDTO";

export class CreateSecaoProdutoCase {
  async execute({
    name,
    possuiAdicionais,
  }: SecaoProdutoDTO): Promise<SecaoProduto> {
    // Verificar se a secao já existe
    const secaoProdutoAlreadyExists = await prisma.secaoProduto.findUnique({
      where: {
        name,
      },
    });

    if (secaoProdutoAlreadyExists) {
      throw new AppError("The section already exists!");
    }

    const secaoProduto = await prisma.secaoProduto.create({
      data: {
        name,
        possuiAdicionais,
      },
    });

    return secaoProduto;
  }
}
