import * as sharp from 'sharp';
import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConvertService {
  async toWebp(file: Express.Multer.File) {
    const cleanUUID = randomUUID().replace(/\./g, '');
    const fileName = `${cleanUUID}.webp`;

    const buffer: Buffer = await sharp(file.buffer).webp().toBuffer();

    return { fileName, buffer };
  }
}
