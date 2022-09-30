import { Router } from "express";
import { CreateRecheioController } from "../modules/recheios/recheioCases/createRecheio/CreateRecheioController";
import { DeleteRecheioController } from "../modules/recheios/recheioCases/deleteRecheio/DeleteRecheioController";
import { ReadRecheioCase } from "../modules/recheios/recheioCases/readRecheio/ReadRecheioCase";
import { ReadRecheiosCase } from "../modules/recheios/recheioCases/readRecheio/ReadRecheiosCase";
import { UpdateRecheioController } from "../modules/recheios/recheioCases/updateRecheio/UpdateRecheioController";

const createRecheioController = new CreateRecheioController()
const readRecheioCase = new ReadRecheioCase()
const readRecheiosCase = new ReadRecheiosCase()
const updateRecheioController = new UpdateRecheioController()
const deleteRecheioControlleer = new DeleteRecheioController()


const recheioRoutes = Router()

recheioRoutes.post("/", createRecheioController.handle)
recheioRoutes.get("/", readRecheiosCase.execute)
recheioRoutes.get("/:id", readRecheioCase.execute)
recheioRoutes.put("/:id", updateRecheioController.handle)
recheioRoutes.delete("/:id", deleteRecheioControlleer.handle)


export { recheioRoutes }
