const dataSource = require("../../Database/dataSource");
import { Filling } from "../models/Filling";
import {
    FillingCreateType,
    fillingCreateSchema,
    FillingBaseType,
    fillingBaseSchema,
    FillingUpdateType,
    fillingUpdateSchema
} from "../Validators/Filling";
import { ErrorHandler } from "../Errors/ErrorHandler";
const Utils = require("../Utils/Utils");

const fillingRepository = dataSource.getRepository(Filling);

class FillingsController {

    async index(req:any, res:any): Promise<any> {
        const fillings = await fillingRepository
        .createQueryBuilder('fillings').getMany();

        return res.json({
            error: false,
            fillings: fillings
        });
    }

    async create(req:any, res:any): Promise<any> {
        const filling: FillingCreateType = {
            name: req.body.name,
            available: req.body.available,
            price: req.body.price
        }

        const validation = await fillingCreateSchema.validate(filling)
            .catch(err => { return err });

        if(validation.errors)
            return res.status(400).json(
                new ErrorHandler(filling, validation.errors).handle());

        try{
            await fillingRepository.createQueryBuilder('filling')
                .insert()
                .into(Filling)
                .values(filling)
                .execute()
        }catch(err:any){
            return res.status(400).json(
                new ErrorHandler(filling, err.message).handle());
        }

        return res.status(201).json({
            error: false,
            filling: filling
        });

    }

    async show(req:any,res:any): Promise<any> {
        const filling: FillingBaseType = {
            id: req.params.id
        };

        const validation = await fillingBaseSchema.validate(filling)
            .catch(err => {return err});

        if(validation.errors)
            return res.status(400).json(
                new ErrorHandler(filling, validation.errors).handle());

        const fillingExists = await Utils.exists(Filling, filling.id);
        if(!fillingExists)
            return res.status(404).json(
                new ErrorHandler(filling, ['Filling not found.']));

        return res.json({
            error: false,
            filling: fillingExists
        });

    }

    async remove(req:any,res:any): Promise<any> {
        const filling: FillingBaseType = {
            id: req.body.id
        };

        const validation = await fillingBaseSchema.validate(filling)
            .catch(err => { return err; });

        if(validation.errors)
            return res.status(404).json(
                new ErrorHandler(filling, validation.errors));

        try{
            await fillingRepository
                .createQueryBuilder('filling')
                .delete()
                .from(Filling)
                .where("filling.id = :id", {id: filling.id})
                .execute();
        }catch(err:any) {
            return res.status(400).json(
                new ErrorHandler(filling, err.message).handle());
        }

        return res.json({
            error: false,
            filling: filling
        });
    }

    async update(req:any,res:any): Promise<any>{
        const filling: FillingUpdateType = {
            id: req.body.id,
            name: req.body.name,
            available: req.body.available,
            price: req.body.price
        };

        const validation = await fillingUpdateSchema.validate(filling)
            .catch(err => {return err});

        if(validation.errors)
            return res.status(400).json(
                new ErrorHandler(filling, validation.errors).handle());

        const fillingExists = await Utils.exists(Filling, filling.id);
        if(!fillingExists)
            return res.status(404).json(
                new ErrorHandler(filling, ['Filling not found.']));

        try{
            await fillingRepository
                .createQueryBuilder('filling')
                .update(Filling)
                .set(filling)
                .where("filling.id = :id", { id: filling.id })
                .execute()
        }catch(err:any){
            return res.status(400).json(
                new ErrorHandler(filling, err.message).handle());
        }

        return res.json({
            error: false,
            filling: filling
        });
    }

}

module.exports = new FillingsController();