import { createClient } from 'redis';

const createRedisClient = () => {
  const client = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  });

  client.on('error', (err) => console.error('Redis Client Error', err));

  return {
    connect: async () => await client.connect(),
    disconnect: async () => await client.disconnect(),
    getClient: () => client,
  };
};

export const redisClient = createRedisClient();

