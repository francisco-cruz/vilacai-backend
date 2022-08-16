import { Router } from "express";
import { produtoRoutes } from "./produto.routes";
import { recheioRoutes } from "./recheio.routes";

const routes = Router()

routes.use("/produtos", produtoRoutes)
routes.use("/recheios",recheioRoutes )

export {routes}