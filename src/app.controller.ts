import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { retry } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return 'Hola mundo!';
  }

  @Get('nuevo')
  newEndpoint(): string {
    return 'Nuevo endpoint'
  }

  @Get('/ruta/')
  holi(): string {
    return 'Holi con /sas/'
  }
}
