const dataSource = require('../../Database/dataSource');
import {Product} from "../models/Product";
import { Section } from "../models/Section";
import {
    productCreateSchema,
    productBaseSchema,
    productUpdateSchema,
    ProductCreateType,
    ProductBaseType,
    ProductUpdateType,
    ProductAddFillingType,
    productAddFillingSchema,
    ProductTypeType,
    productTypeSchema
} from "../Validators/Product";
import {ErrorHandler} from '../Errors/ErrorHandler';
import { Filling } from "../models/Filling";
import { ProductType } from "../models/ProductType";
const Utils = require("../Utils/Utils");
import { Image } from "../models/Image";

const productRepository = dataSource.getRepository(Product);

class ProductController {
    
    async index(req:any, res:any): Promise<any> {
        const products = await productRepository
            .createQueryBuilder("product")
            .leftJoinAndSelect("product.section", "section")
            .leftJoinAndSelect("product.image", "image")
            .getMany();

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
            price: req.body.price,
            qntdMaxFilling: req.body.qntdMaxFilling,
            imageId: req.body.imageId
        };

        const validation = await productCreateSchema.validate(product)
            .catch(err => { return err; });
        
        if(validation.errors)
            return res.status(400).json(
                new ErrorHandler(product, validation.errors).handle());

        const sectionExist = await Utils.exists(Section, product.section);
        if(!sectionExist)
            return res.status(404).json(
                new ErrorHandler(product, ["Section not found"]).handle());

        const imageExist = await Utils.exists(Image, product.imageId);
        if(!imageExist)
            return res.status(404).json(
                new ErrorHandler(product, ['Image not found.']).handle());

        try {
            const productToSave = new Product();
            productToSave.name = product.name;
            productToSave.available = true || product.available;
            productToSave.price = product.price;
            productToSave.image = imageExist;
            productToSave.section = sectionExist;
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
            id: req.params.id
        };

        const validation = await productBaseSchema.validate(product)
            .catch(err => { return err; });
        
        if(validation.errors)
            return res.status(400).json(
                new ErrorHandler(product, validation.errors).handle());

        const productExists = await Utils.exists(Product, product.id);
        if(!productExists)
            return res.status(404).json(
                new ErrorHandler(product, ['Product not found.']).handle());

        const productFromDb = await productRepository
                .createQueryBuilder('product')
                .leftJoinAndSelect("product.section", "section")
                .leftJoinAndSelect("product.fillings", "fillings")
                .leftJoinAndSelect("product.types", "types")
                .leftJoinAndSelect("product.image", "image")
                .where("product.id = :id", {id: product.id})
                .getOne();

        return res.json({
            error: false,
            product: productFromDb
        });
    }

    async remove(req:any, res:any): Promise<any> {
        const product: ProductBaseType = {
            id: req.params.id
        };

        const validation = await productBaseSchema.validate(product)
            .catch(err => { return err; });

        if(validation.errors)
            return res.status(404).json(
                new ErrorHandler(product, validation.errors).handle());

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
            id: req.params.id,
            section: req.body.section,
            name: req.body.name,
            price: req.body.price,
            available: req.body.available,
            qntdMaxFilling: req.body.qntdMaxFilling,
            imageId: req.body.imageId
        };

        const validation = await productUpdateSchema.validate(product)
            .catch(err => { return err; });

        if(validation.errors)
            return res.status(400).json(
                new ErrorHandler(product, validation.errors).handle());
        
        const productExists = await Utils.exists(Product, product.id);
        if(!productExists)
            return res.status(404).json(
                new ErrorHandler(product, ['Product not found.']).handle());

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

    async addFilling(req:any,res:any): Promise<any> {
        const productFilling: ProductAddFillingType = {
            fillingId: req.body.fillingId,
            productId: req.body.productId
        };

        const validation = await productAddFillingSchema.validate(productFilling)
            .catch(err => {return err});

        if(validation.errors)
            return res.status(400).json(
                new ErrorHandler(productFilling, validation.errors).handle());

        const productExists = await Utils.exists(Product, productFilling.productId);
        if(!productExists)
            return res.status(404).json(
                new ErrorHandler(productFilling, ['Product not found.']).handle());
        const fillingExists = await Utils.exists(Filling, productFilling.fillingId);
        if(!fillingExists)
            return res.status(404).json(
                new ErrorHandler(productFilling, ['Filling not found.']).handle());
        
        try{
            await productRepository
                .createQueryBuilder('product')
                .relation(Product, 'fillings')
                .of({id: productFilling.productId})
                .add({id: productFilling.fillingId});
        }catch(err:any){
            return res.status(400).json(
                new ErrorHandler(productFilling, err.message).handle());
        }
            
        return res.json({
            error: false,
            product: productFilling
        })
    }

    async removeFilling(req:any,res:any): Promise<any> {
        const productFilling: ProductAddFillingType = {
            productId: req.body.productId,
            fillingId: req.body.fillingId
        };

        const validation = await productAddFillingSchema.validate(productFilling)
            .catch(err => {return err});

        if(validation.errors)
            return res.status(400).json(
                new ErrorHandler(productFilling, validation.errors).handle());

        const productExists = await Utils.exists(Product, productFilling.productId);
        if(!productExists)
            return res.status(404).json(
                new ErrorHandler(productFilling, ['Product not found.']).handle());
        const fillingExists = await Utils.exists(Filling, productFilling.fillingId);
        if(!fillingExists)
            return res.status(404).json(
                new ErrorHandler(productFilling, ['Filling not found.']).handle());

        try{
            await productRepository
                .createQueryBuilder('product')
                .relation(Product, 'fillings')
                .of({id: productFilling.productId})
                .remove({id: productFilling.fillingId});
        }catch(err:any){
            return res.status(400).json(
                new ErrorHandler(productFilling, err.message).handle());
        }

        return res.json({
            error: false,
            product: productFilling
        });

    }

    async addType(req:any,res:any): Promise<any> {
        const productTypeObj: ProductTypeType = {
            productId: req.body.productId,
            typeId: req.body.typeId
        };

        const validation = await productTypeSchema.validate(productTypeObj)
            .catch(err => {return err});

        if(validation.errors)
            return res.status(400).json(
                new ErrorHandler(productTypeObj, validation.errors).handle());

        const productExists = await Utils.exists(Product, productTypeObj.productId);
        if(!productExists)
            return res.status(404).json(
                new ErrorHandler(productTypeObj, ['Product not found.']).handle());
        const typeExists = await Utils.exists(ProductType, productTypeObj.typeId);
        if(!typeExists)
            return res.status(404).json(
                new ErrorHandler(productTypeObj, ['Type not found.']).handle());
        
        try {
            await productRepository
                .createQueryBuilder('product')
                .relation(Product, 'types')
                .of({id: productTypeObj.productId})
                .add({id: productTypeObj.typeId});
        }catch(err:any){
            return res.status(400).json(
                new ErrorHandler(productTypeObj, err.message).handle());
        }

        return res.json({
            error: false,
            propuctType: productTypeObj
        });
    }

    async removeType(req:any,res:any): Promise<any> {
        const productTypeObj: ProductTypeType = {
            productId: req.body.productId,
            typeId: req.body.typeId
        };

        const validation = await productTypeSchema.validate(productTypeObj)
            .catch(err => {return err});

        if(validation.errors)
            return res.status(400).json(
                new ErrorHandler(productTypeObj, validation.errors).handle());

        const productExists = await Utils.exists(Product, productTypeObj.productId);
        if(!productExists)
            return res.status(404).json(
                new ErrorHandler(productTypeObj, ['Product not found.']).handle());
        const typeExists = await Utils.exists(ProductType, productTypeObj.typeId);
        if(!typeExists)
            return res.status(404).json(
                new ErrorHandler(productTypeObj, ['Type not found.']).handle());
        
        try {
            await productRepository
                .createQueryBuilder('product')
                .relation(Product, 'types')
                .of({id: productTypeObj.productId})
                .remove({id: productTypeObj.typeId})
        }catch(err:any){
            return res.status(400).json(
                new ErrorHandler(productTypeObj, err.message).handle());
        }

        return res.json({
            error: false,
            propuctType: productTypeObj
        });
    }

}

module.exports = new ProductController();