import { path } from 'app-root-path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UPLOAD_FOLDER } from '@/constants';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { ConvertService } from './convert.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${path}/${UPLOAD_FOLDER}`,
      serveRoot: '/static',
    }),
  ],
  controllers: [FileController],
  providers: [FileService, ConvertService],
  exports: [FileService],
})
export class FileModule {}
