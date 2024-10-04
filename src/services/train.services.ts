import { redisClient } from "../config/redis";
import { createBooking, getBookingStatus, processBookingWithTransaction } from "../repository/booking.repositry";
import { findTrainsBetweenStations, getTrainById, seatAvailability } from "../repository/train.repository"

//get train between stations
export const getTrainBetweenStations = async (source: string, destination: string) => {
    const trains=await findTrainsBetweenStations(source,destination);
    if(!trains){
        throw new Error("No trains found")
    }
    return trains;
}

//check for seat in particular train
export const checkSeatAvailability = async (id: number) => {
    const findTrain=await getTrainById(id);
    if(!findTrain){
        throw new Error("No train found")
    }
    const train=await seatAvailability(id);
    if(!train){
        throw new Error("No train found")
    }
    return train;
}

//get booking status
export const getBookingStatusService= async (id: number) => {
    const BookingStatus=await getBookingStatus(id);
    if(!BookingStatus){
        throw new Error("No booking found")
    }
    return BookingStatus;
}

export const bookTrainService=async(trainId: number, userId: number)=>{
    const booking = await createBooking(userId, trainId);
    if(!booking){
        throw new Error("Booking failed")
    }
    await redisClient.getClient().lPush('bookingQueue', JSON.stringify(booking));
    return booking;
}

export const processBooking= async (bookingId: number, trainId: number): Promise<void> => {
    const updatedBooking = await processBookingWithTransaction(bookingId, trainId);
    await redisClient.getClient().publish(`booking:${bookingId}`, JSON.stringify(updatedBooking));
}