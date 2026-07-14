import { NextResponse } from "next/server";
import {
  PRODUCTS,
  getCreemProductId,
  type ProductId,
} from "@/data/pricing";
import { appBaseUrl, isCreemConfigured } from "@/lib/app-url";
import { getCreem } from "@/lib/creem";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    productId?: ProductId;
  } | null;

  const productId = body?.productId;
  if (!productId || !(productId in PRODUCTS)) {
    return NextResponse.json({ error: "Invalid product" }, { status: 400 });
  }

  // No Creem keys yet → local demo unlock so funnel can be tested
  if (!isCreemConfigured()) {
    return NextResponse.json({
      mode: "demo",
      url: `${appBaseUrl()}/unlock/demo?product=${productId}`,
    });
  }

  const creemProductId = getCreemProductId(productId);
  if (!creemProductId) {
    return NextResponse.json(
      {
        error: `Missing Creem product id. Set ${PRODUCTS[productId].creemEnvKey} in env.`,
      },
      { status: 500 },
    );
  }

  const creem = getCreem();
  if (!creem) {
    return NextResponse.json({ error: "Creem not configured" }, { status: 500 });
  }

  try {
    const checkout = await creem.checkouts.create({
      productId: creemProductId,
      requestId: productId,
      successUrl: `${appBaseUrl()}/unlock/success`,
      metadata: {
        tipProduct: productId,
      },
    });

    if (!checkout.checkoutUrl) {
      return NextResponse.json(
        { error: "Creem did not return a checkout URL" },
        { status: 500 },
      );
    }

    return NextResponse.json({ mode: "creem", url: checkout.checkoutUrl });
  } catch (error) {
    console.error("Creem checkout error", error);
    return NextResponse.json(
      { error: "Failed to create Creem checkout" },
      { status: 500 },
    );
  }
}
