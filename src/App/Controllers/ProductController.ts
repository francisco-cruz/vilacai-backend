const dataSource = require('../../Database/dataSource');
import {Product} from "../models/Product";
import { productSchema, ProductType } from "../Validators/Product";

class ProductController {
    
    async index(req:any, res:any): Promise<void> {
        const users = await dataSource
            .getRepository(Product)
            .createQueryBuilder("product")
            .getMany();

        return res.json({
                error: false,
                users: users
            });
    }

    async create(req:any, res:any): Promise<void> {
        const product: ProductType = {
            name: req.body.name,
            available: req.body.available,
            price: req.body.price
        };

        const validation = await productSchema.validate(product)
            .catch(err => { return err; });
        
            if(validation.errors)
                return res.status(400).json({
                    error: true,
                    product: product,
                    message: validation.errors
                });

            try {
                await dataSource
                    .createQueryBuilder()
                    .insert()
                    .into(Product)
                    .values(product)
                    .execute();
            } catch (err: any) {
                return res.status(400).json({
                    error: true,
                    message: err
                })
            }
        
        return res.status(201).json({
            error: false,
            product: product
        });
    }

}

module.exports = new ProductController();