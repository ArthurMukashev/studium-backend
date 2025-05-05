import { PrismaClient } from '../generated';
import seedUniversity from './seedUniversity';
import seedUsers from './seedUsers';
import seedRoles from './seedRoles';
import seedPosts from './seedPosts';

const prisma = new PrismaClient();
const BCRYPT_HASH_ROUNDS = 10;

async function main() {
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
	.catch((e) => {
		console.error(`Ошибка сидинга: ${e}`);
	})
	.finally(() => {
		prisma.$disconnect();
	});
