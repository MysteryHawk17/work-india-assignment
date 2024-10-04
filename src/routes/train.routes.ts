import { Router } from "express";
import { bookTrain, getBookingStatus, seatAvailability, trainBetweenStations } from "../controllers/train.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";


const   router = Router();


//find all trains between stations 
router.get("/trainBetweenStations",AuthMiddleware, trainBetweenStations);

//seat availablity in particular train
router.get("/seatAvailability/:id",AuthMiddleware,seatAvailability);

//book ticket
router.post("/book/:id", AuthMiddleware, bookTrain);


//get booking status
router.get("/getBookingStatus/:id",AuthMiddleware,getBookingStatus);


export default router;