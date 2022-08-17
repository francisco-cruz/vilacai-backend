import { Router } from "express";
import { produtoRoutes } from "./produto.routes";
import { recheioRoutes } from "./recheio.routes";
import { secaoProdutoRoutes } from "./secaoProduto.routes";
import { secaoRecheioRoutes } from "./secaoRecheio.routes";
const routes = Router()

routes.use("/produtos", produtoRoutes)
routes.use("/recheios",recheioRoutes )
routes.use("/secaoProduto", secaoProdutoRoutes)
routes.use("/secaoRecheio", secaoRecheioRoutes )

export {routes}