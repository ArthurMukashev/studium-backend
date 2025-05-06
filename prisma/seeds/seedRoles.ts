import { PrismaClient, RoleType } from '@prisma/client';

const ROLES = Object.values(RoleType);

export default async function seedRoles(prisma: PrismaClient) {
  for (const name of ROLES) {
    await prisma.role.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
}
