const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const main = async () => {
  const password = await prisma.password.create({
    data: {}
  });

  const currentPassword = await prisma.currentPassword.create({
    data: { updatedAt: null }
  })

  const currentCallCounter = await prisma.counter.create({
    data: { updatedAt: null }
  });

  const totalPasswords = await prisma.totalPasswords.create({
    data: { updatedAt: null }
  })
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