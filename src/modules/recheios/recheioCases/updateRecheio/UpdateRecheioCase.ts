const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import { Recheio } from '@prisma/client'
import { AppError } from '../../../../errors/appError';
import { UpdateRecheioDTO } from '../../dtos/UpdateRecheioDTO';


export class UpdateRecheioCase {
  async execute({ id, name, section, qntd_recheio }: UpdateRecheioDTO): Promise<Recheio> {
    // Verificar se o produto existe
    const recheioAlreadyExists = await prisma.produto.findUnique({
      where: {
        id
      }
    })

    if (!recheioAlreadyExists) {
      throw new AppError("Produto does not exists!")
    }

    const updatedRecheio = await prisma.recheio.update({
      where: {
        id
      },
      data: {
        name,
        section,
        qntd_recheio
      }

    })

    return updatedRecheio

  }
}