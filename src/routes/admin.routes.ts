import { Router } from "express";
import {
  createTrain,
  deleteTrain,
  getAllTrains,
  updateTrain,
} from "../controllers/admin.controller";
import { AuthMiddleware, checkAdminApi } from "../middlewares/auth.middleware";

const router = Router();

//create train
router.post("/create",AuthMiddleware,checkAdminApi, createTrain);

//get all trains
router.get("/all", getAllTrains);

//update train

router.put("/update/:id",AuthMiddleware,checkAdminApi, updateTrain);

//delete train

router.delete("/delete/:id",AuthMiddleware,checkAdminApi, deleteTrain);


export default router;
