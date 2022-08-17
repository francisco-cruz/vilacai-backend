import { SecaoProduto } from "@prisma/client";
import { DeleteSecaoProdutoDTO } from "../../dtos/DeleteSecaoProdutoDTO";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export class DeleteSecaoProdutoCase {
  async execute({ id }: DeleteSecaoProdutoDTO): Promise<SecaoProduto> {
    const deletedRecheio = await prisma.secaoProduto.delete({
      where: {
        id,
      },
    });

    return deletedRecheio;
  }
}
