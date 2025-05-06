import * as bcrypt from 'bcrypt';
import { fakerRU as faker } from '@faker-js/faker';
import { PrismaClient, RoleType } from '@prisma/client';

const requiredRoles = Object.values(RoleType);

export default async function seedUsers(prisma: PrismaClient, hashRounds: number) {
  const defaultPassword = await bcrypt.hash('test', hashRounds);

  // Получаем все университеты
  const universities = await prisma.university.findMany();

  // Получаем все роли
  const roles = await prisma.role.findMany();

  // Создаем супер-администратора без привязки к университету
  await prisma.user.create({
    data: {
      email: 'superadmin@system.ru',
      password: defaultPassword,
      is_superadmin: true,
      name: 'Администратор',
      surname: 'Системный',
      patroname: 'Супер',
    },
  });

  // Для каждого университета создаем сотрудников
  for (const university of universities) {
    // Создаем по 5 пользователей для каждой роли
    for (const roleName of requiredRoles) {
      const role = roles.find((r) => r.name === roleName)!;

      for (let i = 1; i <= 5; i++) {
        const userEmail = `${roleName.toLowerCase()}-${university.id}-${i}@univ.ru`;

        // Создаем пользователя
        const user = await prisma.user.create({
          data: {
            email: userEmail,
            password: defaultPassword,
            is_superadmin: false,
            name: faker.person.firstName(),
            surname: faker.person.lastName(),
            patroname: faker.person.middleName(),
          },
        });

        // Привязываем к университету через Employer
        await prisma.employer.create({
          data: {
            user_id: user.id,
            university_id: university.id,
            role_id: role.id,
          },
        });
      }
    }
  }
}
