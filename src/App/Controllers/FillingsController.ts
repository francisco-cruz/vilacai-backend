const dataSource = require("../../Database/dataSource");
import { Filling } from "../models/Filling";
import {
    FillingCreateType,
    fillingCreateSchema
} from "../Validators/Filling";
import { ErrorHandler } from "../Errors/ErrorHandler";

const fillingRepository = dataSource.getRepository(Filling);

class FillingsController {

    async index(req:any, res:any): Promise<any> {
        const fillings = fillingRepository.createQueryBuilder('fillings')
            .getMany();

        return res.json({
            error: false,
            fillings: fillings
        });
    }

    async create(req:any, res:any): Promise<any> {
        const filling: FillingCreateType = {
            name: req.body.name,
            available: req.body.available
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

}

module.exports = new FillingsController();