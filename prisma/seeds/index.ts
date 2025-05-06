import { PrismaClient } from '@prisma/client';
import { BCRYPT_HASH_ROUNDS } from '../../src/constants';
import seedUniversity from './seedUniversity';
import seedUsers from './seedUsers';
import seedRoles from './seedRoles';
import seedPosts from './seedPosts';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('Сидинг ролей...');
  await seedRoles(prisma);

  if (process.env.NODE_ENV === 'development') {
    console.log('Сидинг университетов...');
    await seedUniversity(prisma);

    console.log('Сидинг пользователей...');
    await seedUsers(prisma, BCRYPT_HASH_ROUNDS);

    console.log('Сидинг новостей...');
    await seedPosts(prisma);
  }
}

main()
  .then(() => {
    console.log('Сидинг завершен');
  })
  .catch((error: Error) => {
    console.error(`Ошибка сидинга: ${error.message}`);
  })
  .finally(() => {
    prisma.$disconnect();
  });
