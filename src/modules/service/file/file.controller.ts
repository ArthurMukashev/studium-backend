import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Delete,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FILE_TYPE, MAX_FILE_SIZE } from '@/constants';
import { ApiFileUpload, CurrentAuthUser } from '@/decorators';
import { FileService } from './file.service';
import { PayloadType } from '@/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @ApiFileUpload()
  @UseInterceptors(FilesInterceptor('files'))
  upload(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_FILE_SIZE }),
          new FileTypeValidator({ fileType: FILE_TYPE }),
        ],
      }),
    )
    files: Express.Multer.File[],
    @CurrentAuthUser() user: PayloadType,
  ) {
    return this.fileService.save(files, user.id);
  }

  @Delete(':file_name')
  @ApiOperation({ summary: 'Удаление файла' })
  delete(@Param('file_name', ValidationPipe) file_name: string, @CurrentAuthUser() user: PayloadType) {
    return this.fileService.delete(file_name, user.id);
  }
}
