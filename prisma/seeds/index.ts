import { PrismaClient } from '@prisma/client';
import seedUsers from './seedUsers';

const prisma = new PrismaClient();

async function main() {
  await seedUsers(prisma);
}

main();
