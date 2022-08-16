import { Recheio } from "@prisma/client";
import { DeleteRecheioDTO } from "../../dtos/DeleteRecheioDTO";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export class DeleteRecheioCase {
  async execute({ id }: DeleteRecheioDTO): Promise<Recheio> {

    const deletedRecheio = await prisma.recheio.delete({
      where: {
        id
      },
    })

    return deletedRecheio

  }
}