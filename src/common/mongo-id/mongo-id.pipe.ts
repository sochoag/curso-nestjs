import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isMongoId } from 'class-validator';

@Injectable()
export class MongoIdPipe implements PipeTransform {
  transform(id: string, metadata: ArgumentMetadata) {
    if (!isMongoId(id)) {
      throw new BadRequestException(`${id} is not a mongoId`);
    }
    return id;
  }
}
