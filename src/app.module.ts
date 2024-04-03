import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { MongoClient } from 'mongodb';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import config from './config';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_DB: Joi.required(),
        MONGO_USERNAME: Joi.required(),
        MONGO_PASSWORD: Joi.required(),
        MONGO_HOST: Joi.required(),
        MONGO_CONNECTION: Joi.required(),
        MONGO_PORT: Joi.required(),
        // API_KEY: Joi.string().required(),
        // DATABASE_NAME: Joi.string().required(),
        // DATABASE_PORT: Joi.number().required(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
