import { Router } from "express";
import { produtoRoutes } from "./produto.routes";
import { recheioRoutes } from "./recheio.routes";
import { pedidoRoutes} from "./pedido.routes"
const routes = Router()

routes.use("/produtos", produtoRoutes)
routes.use("/recheios",recheioRoutes )
routes.use("/pedidos", pedidoRoutes )


export {routes}