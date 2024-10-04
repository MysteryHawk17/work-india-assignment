import express from 'express';
import userRoutes from './routes/user.routes';
import adminRoutes from './routes/admin.routes';
import trainRoutes from './routes/train.routes';
import { setupWebSocket } from './socket';
import { redisClient } from './config/redis';
import dotenv from 'dotenv';
const startApp = async () => {
  const app = express();
  dotenv.config();
  
  
  // Middleware for parsing JSON requests
  app.use(express.json());

  // Route setups
  app.use('/api/user', userRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/train', trainRoutes);
  
  // Connect to Redis
  await redisClient.connect();

  // Setup WebSocket
  const server = setupWebSocket(app);

  // Define the port
  const PORT = process.env.PORT || 3000;
  
  // Start the server
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// Start the application
startApp().catch(console.error);
