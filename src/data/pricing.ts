export type ProductId = "unlock" | "pdf";

export type Product = {
  id: ProductId;
  name: string;
  priceLabel: string;
  /** Amount in USD cents for Stripe price_data */
  amountCents: number;
  blurb: string;
  features: string[];
};

export const FREE_PRACTICE_LIMIT = 20;
export const FREE_MOCK_LIMIT = 10;
export const PREMIUM_MOCK_LIMIT = 25;

export const PRODUCTS: Record<ProductId, Product> = {
  unlock: {
    id: "unlock",
    name: "Full Question Bank Unlock",
    priceLabel: "$12.99",
    amountCents: 1299,
    blurb: "Lifetime access on this browser for the complete TX Life & Health bank.",
    features: [
      "All practice questions (not just the free 20)",
      "Full-length timed mocks",
      "Instant explanations + score review",
      "Texas law topic coverage unlocked",
    ],
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
  },
};

export const ACCESS_COOKIE = "tip_access";
