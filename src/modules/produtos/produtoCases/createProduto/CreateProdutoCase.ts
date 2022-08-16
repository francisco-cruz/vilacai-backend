const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

import { Produto } from '@prisma/client'
import { AppError } from '../../../../errors/appError';
import { CreateProdutoDTO } from "../../dtos/CreateProdutoDTO"


export class CreateProdutoCase {
    async execute ({name, section, obs, img, price,qntd, qntd_additional}: CreateProdutoDTO): Promise<Produto>{
        // Verificar se o produto existe
        const produtoAlreadyExists = await prisma.produto.findUnique({
            where: {
                name
            }
        })

        if (produtoAlreadyExists) {
            throw new AppError("Produto already exists!")
        }

        // Criar produto
        const produto = await prisma.produto.create({
            data:{
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