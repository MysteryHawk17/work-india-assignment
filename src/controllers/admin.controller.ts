import { Request, Response } from "express";
import { TrainCreateInput, TrainUpdateInput } from "../dto/train.dt";
import {
  createTrainService,
  deleteTrainService,
  getAllTrainsService,
  updateTrainService,
} from "../services/admin.services";


//create train
export const createTrain = async (req: Request, res: Response) => {
  try {
    const trainInput = <TrainCreateInput>req.body;
    const createdTrain = await createTrainService(trainInput);
    res
      .status(201)
      .json({ message: "Train created successfully", data: createdTrain });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//get all trains
export const getAllTrains = async (req: Request, res: Response) => {
  try {
    const allTrains = await getAllTrainsService();
    res.status(200).json({ data: allTrains });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//update train
export const updateTrain = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const trainInput = <TrainUpdateInput>req.body;
    const updatedTrain = await updateTrainService(parseInt(id), trainInput);
    res.status(200).json({ message: "Train updated successfully", data: updatedTrain });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

//delete train

export const deleteTrain = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTrain = await deleteTrainService(parseInt(id));
     res
      .status(200)
      .json({ message: "Train deleted successfully", data: deletedTrain });
  } catch (error: any) {
     res.status(500).json({ message: error.message });
  }
};
