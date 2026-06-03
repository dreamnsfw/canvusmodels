import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { deductCredits } from "@/lib/credits";
import { generateImage } from "@/lib/fal";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { prompt, model = "fal-ai/flux-pro/v1.1" } = await req.json();
  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  const creditCost = 10;
  const deducted = await deductCredits(
    session.user.id,
    creditCost,
    `Image generation: ${prompt.slice(0, 50)}`
  );
  if (!deducted) {
    return NextResponse.json({ error: "Insufficient credits" }, { status: 402 });
  }

  try {
    const result = await generateImage({ prompt, model });
    const imageUrl = result.images?.[0]?.url ?? result.output?.[0] ?? "";

    const generation = await prisma.generation.create({
      data: {
        userId: session.user.id,
        type: "image",
        prompt,
        imageUrl,
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
        description: `Refund for failed image generation: ${prompt.slice(0, 50)}`,
      },
    });
    await prisma.user.update({
      where: { id: session.user.id },
      data: { credits: { increment: creditCost } },
    });
    return NextResponse.json(
      { error: "Generation failed" },
      { status: 500 }
    );
  }
}
