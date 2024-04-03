import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    mongo: {
      dbName: process.env.MONGO_DB,
      user: process.env.MONGO_USERNAME,
      password: process.env.MONGO_PASSWORD,
      host: process.env.MONGO_HOST,
      connection: process.env.MONGO_CONNECTION,
      port: process.env.MONGO_PORT,
    },
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
      uri: process.env.URI,
    },
    apiKey: process.env.API_KEY,
  };
});
