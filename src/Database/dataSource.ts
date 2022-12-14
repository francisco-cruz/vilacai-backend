import { DataSource } from "typeorm"
import { Product } from "../App/models/Product";
import { Secao } from "../App/models/Secao";

const AppDataSource = new DataSource({
    type: "postgres",
    host: 'localhost',
    port: 5432,
    username: 'michel',
    password: 'michel123',
    database: 'vilaacai',
    synchronize: true,
    entities: [Secao, Product],
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })


module.exports = AppDataSource;