import { Request, Response } from "express";
import { betweenStations } from "../dto/train.dt";
import {
  bookTrainService,
  checkSeatAvailability,
  getBookingStatusService,
  getTrainBetweenStations,
} from "../services/train.services";

//train between stations
export const trainBetweenStations = async (req: Request, res: Response) => {
  try {
    const { source, destination } = <betweenStations>req.body;
    const trains = await getTrainBetweenStations(source, destination);
    res.status(200).json({ data: trains });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//seat availablity
export const seatAvailability = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const train = await checkSeatAvailability(parseInt(id));
    res.status(200).json({ data: train });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//book ticket
export const bookTrain = async (req: Request, res: Response) => {
  const { trainId } = req.params;
  const userId = req.user?.id;
  if (!userId) {
     res.status(401).json({ error: "Unauthorized" });
     return;
  }
  try {
    const booking = await bookTrainService(parseInt(trainId), userId);
    res.json({ message: "Booking request received", bookingId: booking.id });
  } catch (error) {
    res.status(500).json({ error: "Failed to create booking" });
  }
};

//get booking status
export const getBookingStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const BookingStatus = await getBookingStatusService(parseInt(id));
    res.status(200).json({ data: BookingStatus });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
