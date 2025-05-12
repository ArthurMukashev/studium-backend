import { Injectable } from '@nestjs/common';
import { MyLogger } from '@/common';
import { FileRepository } from './file.repository';

@Injectable()
export class FileService {
  constructor(
    private readonly fileRepository: FileRepository,
    private logger: MyLogger,
  ) {
    this.logger.setContext(FileService.name);
  }
}
