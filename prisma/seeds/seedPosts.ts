import { fakerRU as faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

export default async function seedPosts(prisma: PrismaClient) {
  // Получаем все университеты
  const universities = await prisma.university.findMany();

  // Параметры генерации
  const CATEGORIES_PER_UNIVERSITY = 5;
  const POSTS_PER_CATEGORY = 10;

  for (const university of universities) {
    // Создаем категории для университета
    for (let i = 1; i <= CATEGORIES_PER_UNIVERSITY; i++) {
      const categoryName = `${faker.lorem.words(2)}-${university.id}-${i}`;

      // Создаем или обновляем категорию
      const category = await prisma.postCategory.upsert({
        where: { name: categoryName },
        update: {},
        create: {
          name: categoryName,
          university_id: university.id,
        },
      });

      // Получаем сотрудников университета для выбора авторов
      const employers = await prisma.employer.findMany({
        where: { university_id: university.id },
        include: { user: true },
      });

      if (employers.length === 0) {
        console.warn(`В университете ${university.id} нет сотрудников. Пропускаем создание постов`);
        continue;
      }

      // Создаем посты для категории
      for (let j = 0; j < POSTS_PER_CATEGORY; j++) {
        const randomAuthor = faker.helpers.arrayElement(employers).user;

        await prisma.post.create({
          data: {
            name: faker.lorem.sentence(3),
            description: faker.lorem.paragraphs(3),
            file: `file-${faker.string.alphanumeric(10)}.pdf`,
            pub_date: faker.date.recent({ days: 30 }),
            is_published: faker.datatype.boolean(),
            category_id: category.id,
            author_id: randomAuthor.id,
          },
        });
      }
    }
  }
}
