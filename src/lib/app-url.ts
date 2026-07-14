export function appBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://127.0.0.1:3000";
}

export function isCreemConfigured(): boolean {
  return Boolean(process.env.CREEM_API_KEY);
}

export function creemServerMode(): "test" | "prod" {
  const key = process.env.CREEM_API_KEY ?? "";
  if (key.startsWith("creem_test_")) return "test";
  if (process.env.CREEM_TEST_MODE === "true") return "test";
  return "prod";
}
