import prisma from '../../db';

export default async function GerarSenha(req, res) {
  const newPassword = await prisma.password.create({
    data: {}
  });
  await prisma.totalPasswords.update({
    where: { id: 1 },
    data: { count: { increment: 1 } }
  })

  return res.status(200).json(newPassword);
}