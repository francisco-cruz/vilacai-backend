import { Produto } from "@prisma/client";
import { DeleteProdutoDTO } from "../../dtos/DeleteProdutoDTO";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export class DeleteProdutoCase {
  async execute({ id }: DeleteProdutoDTO): Promise<Produto> {

    const deleteProduto = await prisma.produto.delete({
      where: {
        id
      },
    })

    return deleteProduto

  }
}