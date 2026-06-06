import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { deductCredits } from "@/lib/credits";
import { removeSynthID } from "@/lib/synthid";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { imageUrl, imageData, strength } = body;

  if (!imageUrl && !imageData) {
    return NextResponse.json({ error: "Image URL or data is required" }, { status: 400 });
  }

  const creditCost = 5;
  const deducted = await deductCredits(
    session.user.id,
    creditCost,
    "SynthID removal"
  );
  if (!deducted) {
    return NextResponse.json({ error: "Insufficient credits" }, { status: 402 });
  }

  try {
    const result = await removeSynthID({ imageUrl, imageData, strength });

    const generation = await prisma.generation.create({
      data: {
        userId: session.user.id,
        type: "image",
        prompt: "SynthID removal",
        imageUrl: result.outputUrl,
        credits: creditCost,
      },
    });

    return NextResponse.json({ generation });
  } catch (error) {
    await prisma.transaction.create({
      data: {
        userId: session.user.id,
        amount: creditCost,
        type: "usage",
        description: "Refund for failed SynthID removal",
      },
    });
    await prisma.user.update({
      where: { id: session.user.id },
      data: { credits: { increment: creditCost } },
    });
    const message = error instanceof Error ? error.message : "SynthID removal failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
