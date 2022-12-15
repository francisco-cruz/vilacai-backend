const dataSource = require('../../Database/dataSource');
import {Product} from "../models/Product";
import {
    productCreateSchema,
    productUpdateSchema,
    ProductType,
    ProductUpdateType
} from "../Validators/Product";
import {ErrorHandler} from '../Errors/ErrorHandler';

class ProductController {
    
    async index(req:any, res:any): Promise<void> {
        const products = await dataSource
            .getRepository(Product)
            .createQueryBuilder("product")
            .getMany();

        return res.json({
                error: false,
                products: products
            });
    }

    async create(req:any, res:any): Promise<void> {
        const product: ProductType = {
            name: req.body.name,
            available: req.body.available,
            price: req.body.price
        };

        const validation = await productCreateSchema.validate(product)
            .catch(err => { return err; });
        
        if(validation.errors)
            return res.status(400).json(
                new ErrorHandler(product, validation.errors).handle());

        try {
            await dataSource
                .createQueryBuilder()
                .insert()
                .into(Product)
                .values(product)
                .execute();
        } catch (err: any) {
            return res.status(400).json(
                new ErrorHandler(product, err).handle());
        }
        
        return res.status(201).json({
            error: false,
            product: product
        });
    }

    async show(req:any, res:any): Promise<void> {
        const product: ProductUpdateType = {
            id: req.body.id
        };

        const validation = await productUpdateSchema.validate(product)
            .catch(err => { return err; });
        
        if(validation.errors)
            return res.status(400).json(
                new ErrorHandler(product, validation.errors).handle());

        const productFromDb = await dataSource
                .getRepository(Product)
                .createQueryBuilder("product")
                .where("product.id = :id", { id: product.id })
                .getOne();
        
        if(!productFromDb)
            return res.status(404).json(
                new ErrorHandler(product, "Product not found."));

        return res.json({
            error: false,
            product: productFromDb
        });
    }

}

module.exports = new ProductController();