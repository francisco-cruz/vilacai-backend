import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { Produto, SecaoProduto } from "@prisma/client";
import { AppError } from "../../../../errors/appError";
import { CreateProdutoDTO } from "../../dtos/CreateProdutoDTO";

export class CreateProdutoCase {
  async execute({
    name,
    obs,
    img,
    price,
    qntd_max_adicionais,
    id_secao,
  }: CreateProdutoDTO): Promise<Produto> {
    // Verificar se o produto existe na seção
    const produtoAlreadyExists = await prisma.produto.findFirst({
      where: {
        name,
        id_secao
      },
    });
    console.log('a', produtoAlreadyExists)

    // verificando se o produto já existe
    if (produtoAlreadyExists) {
      throw new AppError("Produto already exists!");
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
            id: id_secao,
          },
        },
      },
    });

    return produto;
  }
}
