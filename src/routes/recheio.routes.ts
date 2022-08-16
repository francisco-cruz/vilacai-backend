import { Router } from "express";
import { CreateRecheioController } from "../modules/recheios/recheioCases/createRecheio/CreateRecheioController";

const createRecheioController = new CreateRecheioController()

const recheioRoutes = Router()

recheioRoutes.post("/", createRecheioController.handle)


export { recheioRoutes }
