import * as bcrypt from 'bcrypt';
import { fakerRU as faker } from '@faker-js/faker';
import type { PrismaClient } from '@prisma/client';
import { RoleType } from '@prisma/client';

const requiredRoles = Object.values(RoleType);

export default async function seedUsers(prisma: PrismaClient, hashRounds: number) {
  const defaultPassword = await bcrypt.hash('test', hashRounds);

  // Получаем все роли
  const roles = await prisma.role.findMany();

  if (roles.length === 0) {
    throw Error('Нет запуска сидинга ролей');
  }

  // Создаем супер-администратора
  await prisma.user.create({
    data: {
      email: 'superadmin@system.ru',
      password: defaultPassword,
      is_superadmin: true,
      role: { connect: { name: RoleType.ADMIN } },
      name: 'Администратор',
      surname: 'Системный',
      patroname: 'Супер',
    },
  });

  // Создаем по 5 пользователей для каждой роли
  for (const roleName of requiredRoles) {
    for (let i = 1; i <= 5; i++) {
      const userEmail = `${roleName.toLowerCase()}-app-${i}@univ.ru`;

      // Создаем пользователя
      await prisma.user.create({
        data: {
          email: userEmail,
          password: defaultPassword,
          is_superadmin: false,
          role: { connect: { name: roleName } },
          name: faker.person.firstName(),
          surname: faker.person.lastName(),
          patroname: faker.person.middleName(),
        },
      });
    }
  }
}
