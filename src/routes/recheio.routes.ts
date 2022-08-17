import { Router } from "express";
import { CreateRecheioController } from "../modules/recheios/recheioCases/createRecheio/CreateRecheioController";
import { DeleteRecheioController } from "../modules/recheios/recheioCases/deleteRecheio/DeleteRecheioController";
import { ReadRecheioCase } from "../modules/recheios/recheioCases/readRecheio/ReadRecheioCase";
import { UpdateRecheioController } from "../modules/recheios/recheioCases/updateRecheio/UpdateRecheioController";

const createRecheioController = new CreateRecheioController()
const readRecheioCase = new ReadRecheioCase()
const updateRecheioController = new UpdateRecheioController()
const deleteRecheioControlleer = new DeleteRecheioController()


const recheioRoutes = Router()

recheioRoutes.post("/", createRecheioController.handle)
recheioRoutes.get("/", readRecheioCase.execute)
recheioRoutes.put("/", updateRecheioController.handle)
recheioRoutes.delete("/", deleteRecheioControlleer.handle)


export { recheioRoutes }
