import { Produto } from "@prisma/client";
import { UpdateProdutoDTO } from "../../dtos/UpdateProdutoDTO"

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



export class UpdateProdutoCase {
  async execute({ id, name, section, obs, img, price, qntd, qntd_additional }: UpdateProdutoDTO): Promise<Produto> {


    const updatedProduto = await prisma.produto.update({
      where: {
        id
      },

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

    return updatedProduto
  }
}