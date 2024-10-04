import { TrainCreateInput, TrainUpdateInput } from "../dto/train.dt";
import {
  createTrain,
  deleteTrain,
  getAllTrains,
  getTrainById,
  updateTrain,
} from "../repository/train.repository";

//create train
export const createTrainService = async (data: TrainCreateInput) => {
  const { name, source, destination, totalSeats, departureTime } = data;
  const availableSeats = totalSeats;
  const dateTime = new Date(departureTime);
  const trainData = {
    name: name,
    source: source,
    destination: destination,
    totalSeats: totalSeats,
    availableSeats: availableSeats,
    departureTime: dateTime,
  };
  const createdTrain = await createTrain(trainData);
  if (!createdTrain) {
    throw new Error("Train not created");
  }
  return createdTrain;
};
//get all trains
export const getAllTrainsService = async () => {
  const allTrains = await getAllTrains();
  if (!allTrains) {
    throw new Error("No trains found");
  }
  return allTrains;
};

//update train
export const updateTrainService = async (
  id: number,
  data: TrainUpdateInput
) => {
  const findTrain = await getTrainById(id);

  if (!findTrain) {
    throw new Error("Train not found");
  }
  const { name, source, destination, totalSeats, departureTime } = data;
  const availableSeats = totalSeats;
  const dateTime = new Date(departureTime);
  const trainData = {
    name: name,
    source: source,
    destination: destination,
    totalSeats: totalSeats,
    availableSeats: availableSeats,
    departureTime: dateTime,
  };
  const updatedTrain = await updateTrain(id, trainData);

  if (!updatedTrain) {
    throw new Error("Train not updated");
  }
  return findTrain;
};

//delete train

export const deleteTrainService = async (id: number) => {
  const findTrain = await getTrainById(id);

  if (!findTrain) {
    throw new Error("Train not found");
  }
  const deletedTrain = await deleteTrain(id);

  if (!deletedTrain) {
    throw new Error("Train not deleted");
  }
  return findTrain;
};
