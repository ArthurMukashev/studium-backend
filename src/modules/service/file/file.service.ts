import { randomUUID } from 'crypto';
import { path } from 'app-root-path';
import { basename, join, normalize } from 'path';
import { ensureDir, pathExists, unlink, writeFile } from 'fs-extra';
import { BadRequestException, Injectable } from '@nestjs/common';
import { MyLogger } from '@/common';
import { UPLOAD_FOLDER } from '@/constants';
import { FileResponse } from '@/types';
import { ConvertService } from './convert.service';

@Injectable()
export class FileService {
  constructor(
    private readonly convert: ConvertService,
    private logger: MyLogger,
  ) {
    this.logger.setContext(FileService.name);
  }

  async save(files: Express.Multer.File[], id: number) {
    try {
      const uploadFolder = normalize(`${path}/${UPLOAD_FOLDER}/${id}`);
      await ensureDir(uploadFolder);
      const result: FileResponse[] = [];

      for (const file of files) {
        if (file.mimetype.includes('image/')) {
          const convertedFile = await this.convert.toWebp(file);

          const convertedPath = normalize(join(uploadFolder, convertedFile.fileName));

          await writeFile(convertedPath, convertedFile.buffer);
          result.push({
            url: `static/${id}/${convertedFile.fileName}`,
            name: convertedFile.fileName,
          });
        } else {
          const safeOriginalName = basename(file.originalname);
          const extension = safeOriginalName.split('.').pop() ?? 'file';
          const fileName = `${randomUUID().replace(/\./g, '')}.${extension}`;

          const fullPath = normalize(join(uploadFolder, fileName));

          await writeFile(fullPath, file.buffer);
          result.push({
            url: `static/${id}/${fileName}`,
            name: fileName,
          });
        }
      }

      return result;
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException('Ошибка загрузки файла');
    }
  }

  async delete(fileName: string, id: number) {
    const basePath = normalize(`${path}/${UPLOAD_FOLDER}/${id}`);
    const filePath = normalize(join(basePath, fileName));

    if (!filePath.startsWith(basePath)) {
      throw new BadRequestException('Некорректное имя файла.');
    }

    const exists = await pathExists(filePath);

    if (exists) {
      await unlink(filePath);
    }

    return { message: 'Файл удален.' };
  }
}
