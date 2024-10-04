import { Booking, BookingStatus, PrismaClient } from "@prisma/client";
import { BookingCreate, BookingInput } from "../dto/booking.dt";

const prisma = new PrismaClient();


//get booking status
export const getBookingStatus = async (id: number) => {
  return await prisma.booking.findUnique({
    where: {
      id: id,
    },
  });
};

// book ticket
export const bookTicket = async (data: BookingCreate) => {
  return await prisma.booking.create({
    data: data,
  });
};

export const createBooking = async (userId: number, trainId: number) => {
  return prisma.booking.create({
    data: {
      userId,
      trainId,
      status: 'WAITING_LIST' as BookingStatus,
    },
  });
};

export const updateBookingStatus = async (bookingId: number, status: BookingStatus) => {
  return prisma.booking.update({
    where: { id: bookingId },
    data: { status },
  });
};


export const processBookingWithTransaction = async (bookingId: number, trainId: number) => {
  return prisma.$transaction(async (prisma) => {
    const train = await prisma.train.findUnique({
      where: { id: trainId },
      select: { availableSeats: true },
    });

    if (!train) {
      throw new Error('Train not found');
    }

    let status: BookingStatus = 'WAITING_LIST';
    let newAvailableSeats = train.availableSeats;

    if (train.availableSeats > 0) {
      status = 'CONFIRMED';
      newAvailableSeats--;
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status },
    });

    await prisma.train.update({
      where: { id: trainId },
      data: { availableSeats: newAvailableSeats },
    });

    return updatedBooking;
  });
};


