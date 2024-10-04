import { redisClient } from "../config/redis";
import { processBooking } from "../services/train.services";


const startWorker = async () => {
  await redisClient.connect();
  const client = redisClient.getClient();

  while (true) {
    try {
      const result = await client.brPop('bookingQueue', 0);
      if (result) {
        const { element: bookingJson } = result;
        const booking = JSON.parse(bookingJson);
        await processBooking(booking.id, booking.trainId);
      }
    } catch (error) {
      console.error('Error processing booking:', error);
    }
  }
};

startWorker().catch(console.error);