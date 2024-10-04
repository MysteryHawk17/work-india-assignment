import { PrismaClient } from "@prisma/client";
import {
  TrainCreate,
  TrainUpdate,
} from "../dto/train.dt";

const prisma = new PrismaClient();
//create train repository
export const createTrain = async (data: TrainCreate) => {
  return await prisma.train.create({
    data: data,
  });
};

//get all trains
export const getAllTrains = async () => {
  return await prisma.train.findMany();
};

//get train by id
  export const getTrainById = async (id: number) => {
  return await prisma.train.findUnique({
    where: {
      id: id,
    },
  });
};

//update train
export const updateTrain = async(id: number, data: TrainUpdate) => {
  return await prisma.train.update({
    where: {
      id: id,
    },
    data: data,
  });
};

//delete train
export const deleteTrain = async (id: number) => {
  return await prisma.train.delete({
    where: {
      id: id,
    },
  });
};


//find all trains between stations
export const findTrainsBetweenStations = async (source: string, destination: string) => {
  return await prisma.train.findMany({
    where: {
      source: source,
      destination: destination,
    },
  });
};

//seat availablity in particular train
export const seatAvailability = async (id: number) => {
  return await prisma.train.findUnique({
    where: {
      id: id
    },
    select: {
      name: true,
      source: true,
      destination: true,
      availableSeats: true,
    },
  });
};
