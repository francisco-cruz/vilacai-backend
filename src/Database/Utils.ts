import {Filling} from "../App/models/Filling";
import { Product } from "../App/models/Product";
import { Section } from "../App/models/Section";
import { ProductType } from "../App/models/ProductType";
const dataSource = require("../Database/dataSource");


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