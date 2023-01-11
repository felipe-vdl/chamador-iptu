import prisma from '../../db';

export default async function GerarSenha(req, res) {
  const newPassword = await prisma.password.create({
    data: {}
  });

  return res.status(200).json(newPassword);
}