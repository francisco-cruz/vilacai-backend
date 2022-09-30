import { Router } from "express";
import { CreateSecaoRecheioController } from "../modules/secaoRecheios/secaoRecheioCases/createSecaoRecheio/CreateSecaoRecheioController";
import { DeleteSecaoRecheioController } from "../modules/secaoRecheios/secaoRecheioCases/deleteSecaoRecheio/DeleteSecaoRecheioController";
import { ReadSecaoRecheioCase } from "../modules/secaoRecheios/secaoRecheioCases/readSecaoRecheio/ReadSecaoRecheioCase";
import { UpdateSecaoRecheioController } from "../modules/secaoRecheios/secaoRecheioCases/updateSecaoRecheio/UpdateSecaoRecheioController";

const createSecaoRecheioController = new CreateSecaoRecheioController();
const readSecaoRecheioCase = new ReadSecaoRecheioCase();
const updateSecaoRecheioController = new UpdateSecaoRecheioController()
const deleteSecaoRecheioController = new DeleteSecaoRecheioController();

const secaoRecheioRoutes = Router();

secaoRecheioRoutes.post("/", createSecaoRecheioController.handle);
secaoRecheioRoutes.get("/:id", readSecaoRecheioCase.execute);
secaoRecheioRoutes.get("/", readSecaoRecheioCase.execute);
secaoRecheioRoutes.put("/", updateSecaoRecheioController.handle)
secaoRecheioRoutes.delete("/", deleteSecaoRecheioController.handle);

export { secaoRecheioRoutes };
