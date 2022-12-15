const dataSource = require('../../Database/dataSource');
import {Product} from "../models/Product";
import {
    productCreateSchema,
    productBaseSchema,
    productUpdateSchema,
    ProductCreateType,
    ProductBaseType,
    ProductUpdateType
} from "../Validators/Product";
import {ErrorHandler} from '../Errors/ErrorHandler';

const productRepository = dataSource.getRepository(Product);

class ProductController {
    
    async index(req:any, res:any): Promise<void> {
        const products = await productRepository
            .createQueryBuilder("product").getMany();

        return res.json({
                error: false,
                products: products
            });
    }

    async create(req:any, res:any): Promise<void> {
        const product: ProductCreateType = {
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
            await productRepository.createQueryBuilder()
                .insert()
                .into(Product)
                .values(product)
                .execute();
        } catch (err: any) {
            return res.status(400).json(
                new ErrorHandler(product, err.message).handle());
        }
        
        return res.status(201).json({
            error: false,
            product: product
        });
    }

    async show(req:any, res:any): Promise<void> {
        const product: ProductBaseType = {
            id: req.body.id
        };

        const validation = await productBaseSchema.validate(product)
            .catch(err => { return err; });
        
        if(validation.errors)
            return res.status(400).json(
                new ErrorHandler(product, validation.errors).handle());

        const productFromDb = await productRepository
                .createQueryBuilder("product")
                .where("product.id = :id", { id: product.id })
                .getOne();
        
        if(!productFromDb)
            return res.status(404).json(
                new ErrorHandler(product, ["Product not found."]));

        return res.json({
            error: false,
            product: productFromDb
        });
    }

    async remove(req:any, res:any): Promise<void> {
        const product: ProductBaseType = {
            id: req.body.id
        };

        const validation = await productBaseSchema.validate(product)
            .catch(err => { return err; });

        if(validation.errors)
            return res.status(404).json(
                new ErrorHandler(product, validation.errors));

        try{
            await productRepository
                .createQueryBuilder('products')
                .delete()
                .from(Product)
                .where("id = :id", {id: product.id})
                .execute();
        }catch(err:any) {
            return res.status(400).json(
                new ErrorHandler(product, err.message).handle());
        }

        return res.json({
            error: false,
            product: product
        });

    }

    async update(req:any, res:any): Promise<void> {
        const product: ProductUpdateType = {
            id: req.body.id,
            name: req.body.name,
            price: req.body.price,
            available: req.body.available
        }

        const validation = await productUpdateSchema.validate(product)
            .catch(err => { return err; });

        if(validation.errrors)
            return res.status(400).json(
                new ErrorHandler(product, validation.errors));
        
        await productRepository
            .createQueryBuilder('products')
            .update(Product)
            .set(product)
            .where("id = :id", { id: product.id })
            .execute()

        return res.json({
            error: false,
            product: product
        });
    }

}

module.exports = new ProductController();