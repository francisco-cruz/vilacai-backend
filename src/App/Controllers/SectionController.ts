const dataSource = require('../../Database/dataSource');
import { ErrorHandler } from "../Errors/ErrorHandler";
import { Section } from "../models/Section";
import {
    sectionBaseSchema,
    SectionBaseType,
    SectionCreateType,
    SectionUpdateType,
    sectionCreateSchema,
    sectionUpdateSchema,
} from "../Validators/Section";

const sectionRepository = dataSource.getRepository(Section);

class SectionController {

    async index(req:any, res:any): Promise<void> {
        const sections = await sectionRepository
            .createQueryBuilder("section").getMany();

        return res.json({
                error: false,
                sections: sections
            });
    }

    async show(req:any, res:any): Promise<void> {
        const section: SectionBaseType = {
            id: req.body.id
        };

        const validate = await sectionBaseSchema.validate(section)
            .catch(err => {return err;});

        if(validate.errors)
            return res.status(400).json(
                new ErrorHandler(section, validate.errors).handle());

        const sectionFromDb = await sectionRepository
            .createQueryBuilder("section")
            .where("section.id = :id", {id: section.id})
            .getOne();
        
        if(!sectionFromDb)
            return res.status(404).json(
                new ErrorHandler(section, ["Section not found."]).handle());

        return res.json({
            error: false,
            section: sectionFromDb
        });

    }

    async create(req:any, res:any): Promise<void> {
        const section: SectionCreateType = {
            name: req.body.name
        };

        const validation = await sectionCreateSchema.validate(section)
            .catch(err => {return err});

        if(validation.errors)
            return res.status(400).json(
                new ErrorHandler(section, validation.errors).handle);

        try{
            await sectionRepository.createQueryBuilder('section')
                .insert()
                .into(Section)
                .values(section)
                .execute()
        }catch(err:any){
            return res.status(400).json(
                new ErrorHandler(section, err.message).handle());
        }

        return res.status(201).json({
            error: false,
            section: section
        });
    }

    async update(req:any, res:any): Promise<void> {
        const section: SectionUpdateType = {
            id: req.body.id,
            name: req.body.name
        };

        const validation = await sectionUpdateSchema.validate(section)
            .catch(err => {return err});
        
        if(validation.errors)
            return res.status(400).json(
                new ErrorHandler(section, validation.errors).handle());
        
        try {
            await sectionRepository
            .createQueryBuilder('products')
            .update(Section)
            .set(section)
            .where("id = :id", { id: section.id })
            .execute()
        } catch (err:any) {
            return res.status(400).json(
                new ErrorHandler(section, err.message).handle());
        }

        return res.status(202).json({
            error: false,
            section: section
        });
    }

    async remove(req:any, res:any): Promise<void> {
        const section: SectionBaseType = {
            id: req.body.id
        };

        const validation = await sectionBaseSchema.validate(section)
            .catch(err => { return err });

        if(validation.errors)
            return res.status(400).json(
                new ErrorHandler(section, validation.errors).handle());

        try{
            await sectionRepository
                .createQueryBuilder('products')
                .delete()
                .from(Section)
                .where("id = :id", {id: section.id})
                .execute();
        }catch(err:any) {
            return res.status(400).json(
                new ErrorHandler(section, err.message).handle());
        }

        return res.json({
            error: false,
            section: section,
        })
    }

};

module.exports = new SectionController();