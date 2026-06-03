import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { stripe, CREDIT_PACKS } from "@/lib/stripe";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const { packId } = await req.json();
  const pack = CREDIT_PACKS.find((p) => p.id === packId);
  if (!pack) {
    return NextResponse.json({ error: "Invalid pack" }, { status: 400 });
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `${pack.credits} Credits`,
            description: `CanvasModels credit pack - ${pack.credits} credits`,
          },
          unit_amount: pack.price,
        },
        quantity: 1,
      },
    ],
    metadata: {
      userId: session.user.id,
      credits: pack.credits.toString(),
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=true`,
  });

  return NextResponse.json({ url: checkoutSession.url });
}
