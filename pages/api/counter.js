import prisma from "../../db";

export default async function Counter(req, res) {
  if (req.method === "GET") {
    const currentCounter = await prisma.counter.findUnique({ where: { id: 1 } });
    res.status(200).json({ counter: currentCounter.counter });
  }

  if (req.method === "POST") {
    const updatedCounter = await prisma.counter.update({ where: { id: 1 }, data: { counter: { increment: 1 } } });
    return res.status(200).json({ counter: updatedCounter.counter });
  }

}