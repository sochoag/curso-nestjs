import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongoClient } from 'mongodb';
import config from 'src/config';

// const taskCollection = database.collection('tasks');
// const task = await taskCollection.find().toArray();
// console.log('Lista de tareas:');
// console.log(task);

@Global()
@Module({
  providers: [
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, user, password, dbName, host, port } =
          configService.mongo;
        const uri = `${connection}://${user}:${password}@${host}:${port}`;
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db(`${dbName}`);
        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['MONGO'],
})
export class DatabaseModule {}
