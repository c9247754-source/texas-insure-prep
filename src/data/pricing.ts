export type ProductId = "unlock" | "pdf";

export type Product = {
  id: ProductId;
  name: string;
  priceLabel: string;
  /** Display amount in USD cents */
  amountCents: number;
  blurb: string;
  features: string[];
  /** Env var holding Creem product id (prod_...) */
  creemEnvKey: "CREEM_PRODUCT_UNLOCK" | "CREEM_PRODUCT_PDF";
};

export const FREE_PRACTICE_LIMIT = 45;
export const FREE_MOCK_LIMIT = 25;

export const PRODUCTS: Record<ProductId, Product> = {
  unlock: {
    id: "unlock",
    name: "Full Question Bank Unlock",
    priceLabel: "$12.99",
    amountCents: 1299,
    blurb: "Lifetime access on this browser for the complete TX Life & Health bank.",
    features: [
      "680+ Life & Health practice questions",
      "P&C starter bank included",
      "130-question / 150-minute timed mocks",
      "Weak-domain score review + Texas law depth",
    ],
    creemEnvKey: "CREEM_PRODUCT_UNLOCK",
  },
  pdf: {
    id: "pdf",
    name: "Texas Law Cheat Sheet PDF",
    priceLabel: "$9.99",
    amountCents: 999,
    blurb: "Printable one-sitting review of Texas law themes that sink first-timers.",
    features: [
      "Texas regulator & licensing checklist",
      "Guaranty association / CE / replacement reminders",
      "High-yield ethics & unfair trade snaps",
      "Printable page — study offline",
    ],
    creemEnvKey: "CREEM_PRODUCT_PDF",
  },
};

export const ACCESS_COOKIE = "tip_access";

export function getCreemProductId(productId: ProductId): string | undefined {
  const key = PRODUCTS[productId].creemEnvKey;
  const value = process.env[key]?.trim();
  return value || undefined;
}

export function resolveProductFromCreemId(
  creemProductId: string | null | undefined,
  requestId?: string | null,
): ProductId | null {
  if (requestId === "unlock" || requestId === "pdf") return requestId;
  if (!creemProductId) return null;
  for (const product of Object.values(PRODUCTS)) {
    if (process.env[product.creemEnvKey]?.trim() === creemProductId) {
      return product.id;
    }
  }
  return null;
}
