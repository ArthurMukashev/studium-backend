import { fakerRU as faker } from '@faker-js/faker';
import type { PrismaClient } from '@prisma/client';

function generateOrganizationData(index: number) {
  return {
    name: `Организация ${index} - ${faker.company.name()}`,
    inn: faker.string.numeric(12).slice(0, 12),
    description: faker.company.catchPhrase(),
    avatar: faker.image.urlLoremFlickr({ category: 'business' }),
    departments: Array.from({ length: 3 }, (_, i) => ({
      name: `Отдел ${i + 1} - ${faker.commerce.department()}`,
      description: faker.lorem.sentence(),
    })),
    positions: Array.from({ length: 3 }, (_, i) => ({
      name: `Должность ${i + 1} - ${faker.person.jobTitle()}`,
      description: faker.lorem.sentence(),
    })),
    posts: Array.from({ length: 2 }, (_, i) => ({
      title: `Новость ${i + 1} - ${faker.lorem.words(3)}`,
      content: faker.lorem.paragraphs(3),
      pub_date: faker.date.past(),
      is_published: faker.datatype.boolean(),
      file: faker.image.url(),
    })),
  };
}

export default async function seedOrganizations(prisma: PrismaClient) {
  const organizationsData = Array.from({ length: 3 }, (_, i) => generateOrganizationData(i + 1));

  await prisma.$transaction(async (tx) => {
    for (const orgData of organizationsData) {
      // Проверка существования организации по ИНН
      const existingOrg = await tx.organization.findUnique({
        where: { inn: orgData.inn },
      });

      if (!existingOrg) {
        await tx.organization.create({
          data: {
            ...orgData,
            departments: { create: orgData.departments },
            positions: { create: orgData.positions },
            posts: { create: orgData.posts },
          },
        });
      }
    }
  });
}
