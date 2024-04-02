import { Global, Module } from '@nestjs/common';

const API_KEY = '8805db7a-0e62-403c-b22c-031f87bb583c';
const API_KEY_PROD = 'e56f9c23-b9b0-4f06-a7ed-77cf57f48aa2';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
