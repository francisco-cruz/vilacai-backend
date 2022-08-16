const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import { Recheio } from '@prisma/client'
import { UpdateRecheioDTO } from '../../dtos/UpdateRecheioDTO';


export class UpdateRecheioCase {
  async execute({ id, name, section }: UpdateRecheioDTO): Promise<Recheio> {


    const recheio = await prisma.recheio.update({
      where: {
        id
      },
      data: {
        name,
        section
      }
    
    })

    return recheio

  }
}