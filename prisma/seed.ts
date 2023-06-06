import { prisma } from '../lib/db';
import { hash } from 'bcrypt';

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@mail.com' },
    update: {},
    create: {
      email: 'alice@mail.com',
      name: 'Alice',
      password: await hash('password123', 12),
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@mail.com' },
    update: {},
    create: {
      email: 'bob@mail.com',
      name: 'Bob',
      password: await hash('password456', 12),
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

  const pecans = await prisma.product.upsert({
    where: { name: 'pecans' },
    update: {},
    create: {
      name: 'pecans',
      description:
        'Pecans are a type of tree nut native to North America. Thanks to their rich and buttery flavor, they’re a popular ingredient in desserts and other dishes, such as pecan pie, pecan-crusted chicken, and butter pecan ice cream.',
      price: 5.99,
      category: { connect: { name: 'nuts' } },
    },
  });

  const almonds = await prisma.product.upsert({
    where: { name: 'almonds' },
    update: {},
    create: {
      name: 'almonds',
      description:
        'Almonds are among the world’s most popular tree nuts. They are highly nutritious and rich in healthy fats, antioxidants, vitamins and minerals.',
      price: 4.99,
      category: { connect: { name: 'nuts' } },
    },
  });

  const cashews = await prisma.product.upsert({
    where: { name: 'cashews' },
    update: {},
    create: {
      name: 'cashews',
      description:
        'Cashews are low in sugar and rich in fiber, heart-healthy fats, and plant protein. They’re also a good source of copper, magnesium, and manganese — nutrients important for energy production, brain health, immunity, and bone health.',
      price: 6.99,
      category: { connect: { name: 'nuts' } },
    },
  });

  const walnuts = await prisma.product.upsert({
    where: { name: 'walnuts' },
    update: {},
    create: {
      name: 'walnuts',
      description:
        'Walnuts are a single-seed fruit that provide healthful fats, protein, copper, manganese, and other essential nutrients.',
      price: 7.99,
      category: { connect: { name: 'nuts' } },
    },
  });

  const dairy = await prisma.category.upsert({
    where: { name: 'dairy' },
    update: {},
    create: {
      name: 'dairy',
      description:
        'Dairy products or milk products are a type of food produced from or containing the milk of mammals. They are primarily produced from mammals such as cattle, water buffaloes, goats, sheep, camels and humans.',
    },
  });

  const parmesan = await prisma.product.upsert({
    where: { name: 'parmesan' },
    update: {},
    create: {
      name: 'parmesan',
      description:
        'Parmesan cheese is a good source of protein and fat. It’s also rich in vitamins and minerals like calcium, vitamin A, vitamins B6 and B12, phosphorus, zinc, and copper.',
      price: 8.99,
      category: { connect: { name: 'dairy' } },
    },
  });

  const eggs = await prisma.product.upsert({
    where: { name: 'eggs' },
    update: {},
    create: {
      name: 'eggs',
      description:
        'Eggs are a very good source of inexpensive, high quality protein. More than half the protein of an egg is found in the egg white, which also includes vitamin B2 and lower amounts of fat than the yolk. Eggs are rich sources of selenium, vitamin D, B6, B12 and minerals such as zinc, iron and copper.',
      price: 3.99,
      category: { connect: { name: 'dairy' } },
    },
  });

  const vegetables = await prisma.category.upsert({
    where: { name: 'vegetables' },
    update: {},
    create: {
      name: 'vegetables',
      description:
        'Vegetables are parts of plants that are consumed by humans or other animals as food. The original meaning is still commonly used and is applied to plants collectively to refer to all edible plant matter, including the flowers, fruits, stems, leaves, roots, and seeds.',
    },
  });

  const broccoli = await prisma.product.upsert({
    where: { name: 'broccoli' },
    update: {},
    create: {
      name: 'broccoli',
      description:
        'Broccoli is a good source of fiber and protein, and contains iron, potassium, calcium, selenium and magnesium as well as the vitamins A, C, E, K and a good array of B vitamins including folic acid.',
      price: 2.99,
      category: { connect: { name: 'vegetables' } },
    },
  });

  const spinach = await prisma.product.upsert({
    where: { name: 'spinach' },
    update: {},
    create: {
      name: 'spinach',
      description:
        'Spinach is an excellent source of vitamin K, vitamin A (in the form of carotenoids), manganese, folate, magnesium, iron, copper, vitamin B2, vitamin B6, vitamin E, calcium, potassium and vitamin C. It is a very good source of dietary fiber, phosphorus, vitamin B1, zinc, protein and choline.',
      price: 1.99,
      category: { connect: { name: 'vegetables' } },
    },
  });

  const seafood = await prisma.category.upsert({
    where: { name: 'seafood' },
    update: {},
    create: {
      name: 'seafood',
      description:
        'Seafood is any form of sea life regarded as food by humans, prominently including fish and shellfish. Shellfish include various species of molluscs, crustaceans, and echinoderms.',
    },
  });

  const salmon = await prisma.product.upsert({
    where: { name: 'salmon' },
    update: {},
    create: {
      name: 'salmon',
      description:
        'Salmon is a popular fatty fish and great source of vitamin D. ... Salmon is also a good source of vitamin B12, selenium and choline. It contains the antioxidant astaxanthin, which has benefits for heart, eye and skin health.',
      price: 9.99,
      category: { connect: { name: 'seafood' } },
    },
  });

  const tuna = await prisma.product.upsert({
    where: { name: 'tuna' },
    update: {},
    create: {
      name: 'tuna',
      description:
        'Tuna is a good source of essential nutrients, such as omega-3 fatty acids, high quality protein, selenium and Vitamin D. It is widely available and most commonly consumed as canned tuna.',
      price: 8.99,
      category: { connect: { name: 'seafood' } },
    },
  });

  const aliceCart = await prisma.cart.upsert({
    where: { id: alice.id },
    update: {},
    create: {
      userId: alice.id,
    },
  });

  const bobCart = await prisma.cart.upsert({
    where: { id: bob.id },
    update: {},
    create: {
      userId: bob.id,
    },
  });

  const aliceCartItems = await prisma.cartItem.createMany({
    data: [
      {
        cartId: aliceCart.id,
        productId: pecans.id,
        quantity: 1,
        // price: pecans.price,
      },
      {
        cartId: aliceCart.id,
        productId: almonds.id,
        quantity: 2,
        // price: almonds.price,
      },
      {
        cartId: aliceCart.id,
        productId: cashews.id,
        quantity: 3,
        // price: cashews.price,
      },
    ],
  });

  console.log({
    alice,
    bob,
    nuts,
    pecans,
    almonds,
    cashews,
    walnuts,
    dairy,
    parmesan,
    eggs,
    vegetables,
    broccoli,
    spinach,
    seafood,
    salmon,
    tuna,
    aliceCart,
    aliceCartItems,
    bobCart,
  });
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
