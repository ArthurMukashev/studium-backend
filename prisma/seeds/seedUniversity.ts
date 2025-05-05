import { fakerRU as faker } from '@faker-js/faker';
import { PrismaClient } from '../generated';

export default async function seedUniversity(prisma: PrismaClient) {
	// Создание университетов
	for (let a = 0; a < 5; a++) {
		const university = await prisma.university.create({
			data: {
				name: `${faker.company.name()} Университет #${a + 1}`,
				description: faker.lorem.paragraph(),
			},
		});

		// Создаем факультеты (5 штук)
		for (let b = 0; b < 5; b++) {
			const facultyName = `Факультет ${faker.science.chemicalElement().name} Наук`;
			const shortName = facultyName
				.split(' ')
				.map((word) => word[0])
				.join('')
				.toUpperCase();

			await prisma.facculty.create({
				data: {
					name: facultyName,
					short_name: shortName,
					university_id: university.id,
				},
			});
		}

		// Создаем учебные корпуса (3 штуки)
		for (let c = 0; c < 3; c++) {
			const building = await prisma.building.create({
				data: {
					name: `Корпус ${c + 1}`,
					address: faker.location.streetAddress(),
					description: faker.datatype.boolean() ? faker.lorem.sentence() : null,
					university_id: university.id,
				},
			});

			// Создаем этажи (5 этажей на корпус)
			for (let d = 0; d < 5; d++) {
				const floor = await prisma.floor.create({
					data: {
						name: `Этаж ${d + 1}`,
						description: faker.datatype.boolean() ? faker.lorem.sentence() : null,
						building_id: building.id,
					},
				});

				// Создаем аудитории (10 на этаж)
				for (let e = 0; e < 10; e++) {
					await prisma.room.create({
						data: {
							name: `Аудитория ${floor.name}${e + 1}`.replace(' ', ''),
							description: faker.datatype.boolean() ? faker.lorem.sentence() : null,
							floor_id: floor.id,
						},
					});
				}
			}
		}
	}
}
