import Stripe from "stripe";

function createStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return null;
  }
  return new Stripe(key, {
    typescript: true,
  });
}

export const stripe = createStripe();

export const CREDIT_PACKS = [
  { id: "credits_1000", credits: 1000, price: 1000 },
  { id: "credits_3000", credits: 3000, price: 2500 },
  { id: "credits_7000", credits: 7000, price: 5000 },
] as const;

export function getCreditPack(stripePriceId: string) {
  return CREDIT_PACKS.find((p) => p.id === stripePriceId);
}
