import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { SecaoRecheio } from "@prisma/client";
import { DeleteSecaoRecheioDTO } from "../../dtos/DeleteSecaoRecheioDTO";

export class DeleteSecaoRecheioCase {
  async execute({ id }: DeleteSecaoRecheioDTO): Promise<SecaoRecheio> {
    const deletedSecaoRecheio = await prisma.secaoRecheio.delete({
      where: {
        id,
      },
    });

    return deletedSecaoRecheio;
  }
}
