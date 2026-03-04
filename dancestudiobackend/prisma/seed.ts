import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient({
  adapter: new PrismaMariaDb(process.env['DATABASE_URL'] as string),
});

async function main() {
  const courses = await prisma.course.findMany();
  await Promise.all(
    Array.from({ length: 15 }).map((_, i) => {
      const course = faker.helpers.arrayElement(courses);
      return prisma.application.upsert({
        where: { id: i + 1 },
        update: {},
        create: {
          course_id: course.id,
          price: course.length * 500,
        },
      });
    }),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
