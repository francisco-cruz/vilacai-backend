import { DataSource } from "typeorm"
import { Filling } from "../App/models/Filling";
import { Product } from "../App/models/Product";
import { Section } from "../App/models/Section";
import { ProductType } from "../App/models/ProductType";

const AppDataSource = new DataSource({
    type: "postgres",
    host: 'localhost',
    port: 5432,
    username: 'michel',
    password: 'michel123',
    database: 'vilaacai',
    synchronize: true,
    entities: [Section, Filling, ProductType, Product],
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })


module.exports = AppDataSource;