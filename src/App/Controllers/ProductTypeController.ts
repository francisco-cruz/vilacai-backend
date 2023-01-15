const dataSource = require("../../Database/dataSource");
import { ErrorHandler } from "../Errors/ErrorHandler";
import { ProductType } from "../models/ProductType";
import {
    ProductTypeBaseType, 
    productTypeCreateSchema,
    ProductTypeCreateType,
    productTypeSchema
} from "../Validators/ProductTypeValidator";
const Utils = require("../Utils/Utils");

const productTypeRepository = dataSource.getRepository(ProductType);

class ProductTypeController {
    async index(req:any, res:any): Promise<any> {
        const productTypes = await productTypeRepository
            .createQueryBuilder("type").getMany();

        return res.json({
                error: false,
                types: productTypes
            });
    }

    async create(req:any,res:any): Promise<any> {
        const productType: ProductTypeCreateType = {
            type: req.body.type
        };

        const validation = await productTypeCreateSchema.validate(productType)
            .catch(err => {return err});

        if(validation.errors)
            return res.status(400).json(
                new ErrorHandler(productType, validation.errors).handle());

        try {
            await productTypeRepository
            .createQueryBuilder('productType')
            .insert()
            .into(ProductType)
            .values(productType)
            .execute();
        } catch(err:any){
            return res.status(400).json(
                new ErrorHandler(productType, err.message).handle());
        }

        return res.status(201).json({
            error: false,
            type: productType
        });
    }

    async show(req:any,res:any): Promise<any> {
        const productType: ProductTypeBaseType = {
            id: req.params.id
        };

        const validation = await productTypeSchema.validate(productType)
            .catch(err => {return err});

        if(validation.errors)
            return res.status(400).json(
                new ErrorHandler(productType, validation.errors).handle());

        const productTypeExists = await Utils.exists(ProductType, productType.id);

        if(!productTypeExists)
            return res.status(404).json(
                new ErrorHandler(productType, ['Type not found.'])
            )

        return res.json({
            error: false,
            type: productTypeExists
        });

    }

    async remove(req:any,res:any): Promise<any> {
        const productTypeData: ProductTypeBaseType = {
            id: req.params.id
        };

        const validation = await productTypeSchema.validate(productTypeData)
            .catch(err => {return err});

        if(validation.errors)
            return res.status(400).json(
                new ErrorHandler(productTypeData, validation.errors).handle());

        const productTypeExists = await Utils.exists(ProductType, productTypeData.id);

        if(!productTypeExists)
            return res.status(404).json(
                new ErrorHandler(productTypeData, ['Type not found.']).handle());

        try {
            await productTypeRepository
                .createQueryBuilder('type')
                .delete()
                .from(ProductType)
                .where("id = :id", { id: productTypeData.id })
                .execute()
        }catch(err:any){
            return res.status(400).json(
                new ErrorHandler(productTypeData, err.message).handle());
        }

        return res.json({
            error: false,
            type: productTypeData
        });
    }
}

module.exports = new ProductTypeController();