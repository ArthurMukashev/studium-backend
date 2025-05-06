import { PrismaClient } from '@prisma/client';

export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export interface CookiePayload {
  access_token?: string;
}

export type PrismaTransactionClient = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$transaction' | '$on' | '$use' | '$extends'
>;

