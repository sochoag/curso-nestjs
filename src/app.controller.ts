import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('nuevo')
  newEndpoint(): string {
    return 'Nuevo endpoint';
  }

  @Get('/ruta/')
  holi(): string {
    return 'Holi con /sas/';
  }
}
