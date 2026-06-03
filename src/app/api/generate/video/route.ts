import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { deductCredits } from "@/lib/credits";
import { generateVideo } from "@/lib/fal";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { prompt } = await req.json();
  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  const creditCost = 100;
  const deducted = await deductCredits(
    session.user.id,
    creditCost,
    `Video generation: ${prompt.slice(0, 50)}`
  );
  if (!deducted) {
    return NextResponse.json({ error: "Insufficient credits" }, { status: 402 });
  }

  try {
    const result = await generateVideo({ prompt });
    const videoUrl = result.video?.url ?? result.output ?? "";

    const generation = await prisma.generation.create({
      data: {
        userId: session.user.id,
        type: "video",
        prompt,
        videoUrl,
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
        description: `Refund for failed video generation: ${prompt.slice(0, 50)}`,
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
