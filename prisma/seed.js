const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const main = async () => {
  const password = await prisma.password.create({
    data: {},
  });

  const currentPassword = await prisma.currentPassword.create({
    data: {}
  })

  const currentCallCounter = await prisma.counter.create({
    data: {}
  });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect()
    process.exit(1);
  });