const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import { Produto } from '@prisma/client'
import { ReadProdutoDTO } from "../../dtos/ReadProdutoDTO"

export class ReadProdutoCase {
  async execute({ name, section, obs, img, price, qntd, qntd_additional }: ReadProdutoDTO): Promise<Produto> {
    // Ver produtos
    const produto = await prisma.produto.findMany({
      data: {
        name,
        section,
        obs,
        img,
        price,
        qntd,
        qntd_additional
      }
    })

    return produto

  }
}