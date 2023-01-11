export default async function Current(req, res) {
  const current = await prisma.currentPassword.findUnique({
    where: { id: 1 }
  });

  return res.status(200).json({id: current.password});
}