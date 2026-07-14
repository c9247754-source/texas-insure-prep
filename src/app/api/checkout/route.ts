import { NextResponse } from "next/server";
import { PRODUCTS, type ProductId } from "@/data/pricing";
import { appBaseUrl, getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    productId?: ProductId;
  } | null;

  const productId = body?.productId;
  if (!productId || !(productId in PRODUCTS)) {
    return NextResponse.json({ error: "Invalid product" }, { status: 400 });
  }

  const product = PRODUCTS[productId];
  const stripe = getStripe();

  // Dev / pre-Stripe fallback: grant via demo unlock page
  if (!stripe) {
    return NextResponse.json({
      mode: "demo",
      url: `${appBaseUrl()}/unlock/demo?product=${productId}`,
    });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: product.amountCents,
          product_data: {
            name: product.name,
            description: product.blurb,
          },
        },
      },
    ],
    success_url: `${appBaseUrl()}/unlock/success?session_id={CHECKOUT_SESSION_ID}&product=${productId}`,
    cancel_url: `${appBaseUrl()}/pricing?canceled=1`,
    metadata: {
      productId,
    },
  });

  if (!session.url) {
    return NextResponse.json(
      { error: "Could not create checkout session" },
      { status: 500 },
    );
  }

  return NextResponse.json({ mode: "stripe", url: session.url });
}
