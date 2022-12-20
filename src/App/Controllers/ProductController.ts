const dataSource = require('../../Database/dataSource');
import {Product} from "../models/Product";
import { Section } from "../models/Section";
import {
    productCreateSchema,
    productBaseSchema,
    productUpdateSchema,
    ProductCreateType,
    ProductBaseType,
    ProductUpdateType
} from "../Validators/Product";
import {ErrorHandler} from '../Errors/ErrorHandler';
import { Filling } from "../models/Filling";
const Utils = require("../../Database/Utils");

const productRepository = dataSource.getRepository(Product);
const sectionRepository = dataSource.getRepository(Section);

class ProductController {
    
    async index(req:any, res:any): Promise<any> {
        const products = await productRepository
            .createQueryBuilder("product").getMany();

        return res.json({
                error: false,
                products: products
            });
    }

    async create(req:any, res:any): Promise<any> {
        const product: ProductCreateType = {
            section: req.body.section,
            name: req.body.name,
            available: req.body.available,
            price: req.body.price
        };

        const validation = await productCreateSchema.validate(product)
            .catch(err => { return err; });
        
        if(validation.errors)
            return res.status(400).json(
                new ErrorHandler(product, validation.errors).handle());

        const section = await sectionRepository
            .createQueryBuilder('section')
            .where("section.id = :id", {id: product.section})
            .getOne();

        if(!section)
            return res.status(404).json(
                new ErrorHandler(product, ["Section not found"]).handle());

        try {
            const productToSave = new Product();
            productToSave.name = product.name;
            productToSave.available = true || product.available;
            productToSave.price = product.price;
            productToSave.section = section;
            dataSource.manager.save(productToSave);
        } catch (err: any) {
            return res.status(400).json(
                new ErrorHandler(product, err.message).handle());
        }
        
        return res.status(201).json({
            error: false,
            product: product
        });
    }

    async show(req:any, res:any): Promise<any> {
        const product: ProductBaseType = {
            id: req.body.id
        };

        const validation = await productBaseSchema.validate(product)
            .catch(err => { return err; });
        
        if(validation.errors)
            return res.status(400).json(
                new ErrorHandler(product, validation.errors).handle());

        const productExists = await Utils.exists(Product, product.id);
        if(!productExists)
            return res.status(404).json(
                new ErrorHandler(product, ['Product not found.']));

        return res.json({
            error: false,
            product: productExists
        });
    }

    async remove(req:any, res:any): Promise<any> {
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
                .createQueryBuilder('product')
                .delete()
                .from(Product)
                .where("product.id = :id", {id: product.id})
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

    async update(req:any, res:any): Promise<any> {
        const product: ProductUpdateType = {
            id: req.body.id,
            section: req.body.section,
            name: req.body.name,
            price: req.body.price,
            available: req.body.available
        }

        const validation = await productUpdateSchema.validate(product)
            .catch(err => { return err; });

        if(validation.errors)
            return res.status(400).json(
                new ErrorHandler(product, validation.errors).handle());
        
        const productExists = await Utils.exists(Product, product.id);
        if(!productExists)
            return res.status(404).json(
                new ErrorHandler(product, ['Product not found.']));

        try{
            await productRepository
                .createQueryBuilder()
                .update(Product)
                .set(product)
                .where("id = :id", { id: product.id })
                .execute();
        }catch(err:any){
            return res.status(400).json(
                new ErrorHandler(product, err.message).handle());
        }

        return res.json({
            error: false,
            product: product
        });
    }

}

module.exports = new ProductController();