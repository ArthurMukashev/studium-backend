import { Response } from 'express';
import type { PayloadType } from '@/common';

export interface CustomRequest extends Response {
  user: PayloadType;
}
