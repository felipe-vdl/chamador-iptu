export default async function ChamarProximo(req, res) {
  const { nextId, currentId } = req.body;

  const nextPassword = await prisma.password.findUnique({
    where: {
      id: nextId
    }
  });

  if (nextPassword) {
    const updatedPassword = await prisma.currentPassword.update({
      where: { id: 1 },
      data: { password: nextPassword.id }
    });

    return res.status(200).json({ id: updatedPassword.password });
  }

  return res.status(200).json({id: currentId});
}