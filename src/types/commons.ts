import type { PrismaClient } from '@prisma/client';

// TODO: разбить на папки и отдельные файлы (когда-нибудь)

export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export interface CookiePayload {
  access_token?: string;
}

export interface TokensType {
  access_token: string;
  refresh_token: string;
}

export type PrismaTransactionClient = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$transaction' | '$on' | '$use' | '$extends'
>;
