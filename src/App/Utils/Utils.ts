import {Filling} from "../models/Filling";
import { Product } from "../models/Product";
import { Section } from "../models/Section";
import { ProductType } from "../models/ProductType";
import { Image } from "../models/Image";
const dataSource = require("../../Database/dataSource");
const multer = require("multer");
const path = require("path");

class Utils {


    async exists(model:Filling | Product | Section | ProductType, id: number): Promise<any> {
        const objectFromDb = await dataSource
            .getRepository(model)
            .createQueryBuilder("object")
            .where("object.id = :id", { id: id })
            .getOne()

        return objectFromDb;
    }

}

module.exports = new Utils();