import prisma from "../../db";

export default async function Reset(req, res) {
  const updatedPassword = await prisma.currentPassword.update({
    where: { id: 1 },
    data: { password: 1 }
  });

  await prisma.password.deleteMany({});
  await prisma.$queryRaw`TRUNCATE TABLE password;`;
  await prisma.password.create({ data: { id: 1 } });
  await prisma.totalPasswords.update({
    where: { id: 1 }, data: { count: { increment: 1 } }
  })

  res.status(200).json({ id: 1 });
}