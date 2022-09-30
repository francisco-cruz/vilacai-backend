const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

import { Recheio } from '@prisma/client'
import { AppError } from '../../../../errors/appError';
import { CreateRecheioDTO } from "../../dtos/CreateRecheioDTO"


export class CreateRecheioCase {
  async execute({ name, section, qntd_recheio }: CreateRecheioDTO): Promise<Recheio> {
    // Verificar se o recheio existe
    const recheioAlreadyExists = await prisma.Recheio.findUnique({
      where: {
        name
      }
    })
    // verificnado se o recheio já existe
    if (recheioAlreadyExists) {
      throw new AppError("Produto already exists!")
    }
    // Criar recheio
    const recheio = await prisma.recheio.create({
      data: {
        name,
        section,
        qntd_recheio
      }
    })

    return recheio
  }
}