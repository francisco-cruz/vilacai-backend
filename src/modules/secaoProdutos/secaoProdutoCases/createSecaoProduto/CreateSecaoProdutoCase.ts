const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

import { SecaoProduto } from '@prisma/client';
import { SecaoProdutoDTO } from '../../dtos/SecaoProdutoDTO';


export class CreateSecaoProdutoCase {
  async execute({name, possuiAdicionais}: SecaoProdutoDTO): Promise<SecaoProduto> {
   
    const secaoProduto = await prisma.secaoProduto.create({
      data: {
        name,
        possuiAdicionais
      }
    })

    return secaoProduto

  }
}