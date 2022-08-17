import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { Produto } from '@prisma/client'
import { AppError } from '../../../../errors/appError';
import { CreateProdutoDTO } from "../../dtos/CreateProdutoDTO"


export class CreateProdutoCase {
  async execute({id, name, obs, img, price, qntd_max_adicionais, id_secao }: CreateProdutoDTO): Promise<Produto> {
    // Verificar se o produto existe
    const produtoAlreadyExists = await prisma.produto.findUnique({
      where: {
        id
      }
    })

    if (produtoAlreadyExists) {
      throw new AppError("Produto already exists!")
    }

    // Criar produto
    const produto = await prisma.produto.create({
      data: {
        name,
        obs,
        img,
        price,
        qntd_max_adicionais,
        secao: {
          connect: {
            id: id_secao 
          }
          
        }
      }
    })
 
    return produto

  }
}