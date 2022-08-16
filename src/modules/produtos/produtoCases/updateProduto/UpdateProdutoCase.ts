import { Produto } from "@prisma/client";
import { AppError } from "../../../../errors/appError";
import { UpdateProdutoDTO } from "../../dtos/UpdateProdutoDTO"

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



export class UpdateProdutoCase {
  async execute({ id, name, obs, img, price, qntd, qntd_max_adicionais }: UpdateProdutoDTO): Promise<Produto> {
    // Verificar se o produto existe
    const produtoAlreadyExists = await prisma.produto.findUnique({
      where: {
        id
      }
    })

    if (!produtoAlreadyExists) {
      throw new AppError("Produto does not exists!")
    }

    const updatedProduto = await prisma.produto.update({
      where: {
        id
      },

      data: {
        name,
        obs,
        img,
        price,
        qntd,
        qntd_max_adicionais
      }

    })

    return updatedProduto
  }
}