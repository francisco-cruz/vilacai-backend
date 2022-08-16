const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

import { Produto } from '@prisma/client'
import { AppError } from '../../../../errors/appError';
import { UpdateProdutoDTO } from '../../dtos/UpdateProdutoDTO';


export class UpdateProdutoCase {
  async execute({ name, section, obs, img, price, qntd, qntd_additional }: UpdateProdutoDTO): Promise<Produto> {
    // Verificar se o produto existe
    const produtoAlreadyExists = await prisma.produto.findUnique({
      where: {
        name
      }
    })

    if (!produtoAlreadyExists) {
      throw new AppError("Produto does not exists!")
    }

    // Criar produto
    const produto = await prisma.produto.update({

      where: {
        name
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

    return produto


  }
}