import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Db } from 'mongodb';

import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject('MONGO') private database: Db,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  getHello() {
    return {
      api: this.configService.apiKey,
      db: {
        name: this.configService.database.name,
        port: this.configService.database.port,
      },
    };
  }

  getTasks() {
    const taskCollection = this.database.collection('tasks');
    return taskCollection.find().toArray();
  }
}
