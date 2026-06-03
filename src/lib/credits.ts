import { prisma } from "./db";

export async function getUserCredits(userId: string): Promise<number> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { credits: true },
  });
  return user?.credits ?? 0;
}

export async function deductCredits(
  userId: string,
  amount: number,
  description?: string
): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { credits: true },
  });
  if (!user || user.credits < amount) return false;

  await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: { credits: { decrement: amount } },
    }),
    prisma.transaction.create({
      data: {
        userId,
        amount: -amount,
        type: "usage",
        description: description ?? "AI Generation",
      },
    }),
  ]);
  return true;
}

export async function addCredits(
  userId: string,
  amount: number,
  stripeId?: string
) {
  await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: { credits: { increment: amount } },
    }),
    prisma.transaction.create({
      data: {
        userId,
        amount,
        type: "purchase",
        description: "Credit Pack Purchase",
        stripeId: stripeId ?? null,
      },
    }),
  ]);
}
