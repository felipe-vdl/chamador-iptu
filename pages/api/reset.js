import prisma from "../../db";

export default async function Reset(req, res) {
  try {
    const updatedPassword = await prisma.currentPassword.update({
      where: { id: 1 },
      data: { password: 1 }
    });
  
    await prisma.password.deleteMany({});
    await prisma.$queryRaw`TRUNCATE TABLE password;`;
  
    res.status(200).json({ id: 1 });
    
  } catch (error) {
    res.status(500).json(error);
  }
}