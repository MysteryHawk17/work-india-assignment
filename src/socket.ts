import { WebSocketServer, WebSocket } from 'ws';
import { createServer, Server } from 'http';
import { parse } from 'url';
import express, { Request } from 'express';
import { redisClient } from './config/redis';

export const setupWebSocket = (app: express.Application): Server => {
  const server = createServer(app);
  const wss = new WebSocketServer({ server });

  wss.on('connection', async (ws: WebSocket, req:Request) => {
    console.log("New client connected");

    const { query } = parse(req.url!, true);
    const bookingId = query.bookingId as string;

    if (bookingId) {
      console.log(`Client subscribed to booking ${bookingId}`);
      
      const subscriber = redisClient.getClient().duplicate();
      await subscriber.connect();

      await subscriber.subscribe(`booking:${bookingId}`, (message:string) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(message);
        }
      });

      ws.on('close', () => {
        subscriber.unsubscribe(`booking:${bookingId}`);
        subscriber.disconnect();
      });
    }
  });

  return server;
};
