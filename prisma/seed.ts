import { prisma } from '../lib/db';

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@mail.com' },
    update: {},
    create: {
      email: 'alice@mail.com',
      name: 'Alice',
      password: 'password123',
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@mail.com' },
    update: {},
    create: {
      email: 'bob@mail.com',
      name: 'Bob',
      password: 'password456',
    },
  });

  const nuts = await prisma.category.upsert({
    where: { name: 'nuts' },
    update: {},
    create: {
      name: 'nuts',
      description:
        'Nuts are a diverse group of plant-based foods that are nutrient-dense and offer various health benefits.',
    },
  });

  console.log({ users: { alice, bob }, category: nuts });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
