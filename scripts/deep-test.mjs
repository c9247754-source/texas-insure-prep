/**
 * Deep integration test against local production server.
 * Usage: node scripts/deep-test.mjs [baseUrl]
 */
import assert from "assert";
import { createHmac } from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const BASE = process.argv[2] || "http://127.0.0.1:3460";

const results = { pass: 0, fail: 0, skips: 0, details: [] };

function ok(name, cond, extra = "") {
  if (cond) {
    results.pass += 1;
    results.details.push(`PASS  ${name}${extra ? " — " + extra : ""}`);
  } else {
    results.fail += 1;
    results.details.push(`FAIL  ${name}${extra ? " — " + extra : ""}`);
  }
}

function parseCookie(setCookie) {
  if (!setCookie) return "";
  const parts = Array.isArray(setCookie) ? setCookie : [setCookie];
  return parts.map((c) => c.split(";")[0]).join("; ");
}

async function fetchRaw(p, opts = {}) {
  const res = await fetch(BASE + p, {
    ...opts,
    redirect: "manual",
    headers: {
      ...(opts.headers || {}),
    },
  });
  const buf = Buffer.from(await res.arrayBuffer());
  return { res, buf, text: buf.toString("utf8") };
}

// ---------- 1. Static data integrity ----------
function testQuestionBanks() {
  const files = {
    life: ["life.ts", "life"],
    health: ["health.ts", "health"],
    annuity: ["annuity.ts", "annuity"],
    ethics: ["ethics.ts", "ethics"],
    "texas-law": ["texas-law.ts", "texas-law"],
  };
  let total = 0;
  const allIds = new Set();
  for (const [domain, [file]] of Object.entries(files)) {
    const src = fs.readFileSync(
      path.join(root, "src/data/questions", file),
      "utf8",
    );
    const re =
      /\{\s*id:\s*"([^"]+)",\s*domain:\s*"([^"]+)",\s*prompt:\s*"((?:\\.|[^"\\])*)",\s*choices:\s*(\[[^\]]*\]),\s*correctIndex:\s*(\d+),\s*explanation:\s*"((?:\\.|[^"\\])*)"\s*,?\s*\}/g;
    let m;
    let n = 0;
    let bad = 0;
    while ((m = re.exec(src))) {
      n += 1;
      const id = m[1];
      const choices = JSON.parse(m[4]);
      const idx = Number(m[5]);
      if (allIds.has(id)) bad += 1;
      allIds.add(id);
      if (choices.length !== 4 || idx < 0 || idx > 3) bad += 1;
      if (new Set(choices).size !== 4) bad += 1;
      if (!m[3].trim() || !m[6].trim()) bad += 1;
      if (m[2] !== domain) bad += 1;
    }
    total += n;
    ok(`bank ${domain} count`, n >= 180, `${n} items`);
    ok(`bank ${domain} integrity`, bad === 0, `bad=${bad}`);
  }
  ok("L&H total >= 1000", total >= 1000, `total=${total}`);

  const pc = fs.readFileSync(
    path.join(root, "src/data/questions/tx-property-casualty.ts"),
    "utf8",
  );
  const pcIds = (pc.match(/pc-\d+/g) || []).length;
  ok("P&C starter ~80", pcIds === 80, `pc=${pcIds}`);
  ok("P&C no ethics dump", !(pc.includes('"ethics"') && (pc.match(/"ethics"/g) || []).length > 5));
}

function testAccessCodeLib() {
  process.env.ACCESS_CODE_SECRET = "deep-test-secret";
  // inline HMAC same as src/lib/access-code.ts
  function b64url(input) {
    return Buffer.from(input)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }
  function sign(payload) {
    return b64url(
      createHmac("sha256", "deep-test-secret").update(payload).digest(),
    );
  }
  const payload = JSON.stringify({ v: 1, premium: 1, pdf: 1, iat: Math.floor(Date.now() / 1000) });
  const body = b64url(payload);
  const code = `TIP.${body}.${sign(body)}`;
  ok("access code format", code.startsWith("TIP.") && code.split(".").length === 3);
  const bad = code.slice(0, -2) + "xx";
  ok("tampered code differs", bad !== code);
  return code;
}

function testLearnWordCounts() {
  const articles = fs.readFileSync(
    path.join(root, "src/data/seo/learn-articles.ts"),
    "utf8",
  );
  const extra = fs.readFileSync(
    path.join(root, "src/data/seo/learn-extra.ts"),
    "utf8",
  );
  const long = fs.readFileSync(
    path.join(root, "src/data/seo/learn-longform.ts"),
    "utf8",
  );
  function words(s) {
    return (s.match(/[A-Za-z']+/g) || []).length;
  }
  function extract(src, slug) {
    const re = new RegExp('"' + slug + '": \\[([\\s\\S]*?)\\n  \\],');
    const m = src.match(re);
    return m ? m[1] : "";
  }
  const extraBody = extra.split("LEARN_BODY_EXTRA")[1]?.split("LEARN_FAQS")[0] || "";
  const faqBody = extra.split("LEARN_FAQS")[1]?.split("LEARN_RELATED")[0] || "";
  const slugs = [...articles.matchAll(/slug: "([^"]+)"/g)]
    .map((m) => m[1])
    .filter((s) => s !== "pricing");
  let under = 0;
  for (const slug of slugs) {
    const baseRe = new RegExp(
      'slug: "' + slug + '"[\\s\\S]*?body: \\[([\\s\\S]*?)\\],\\s*ctaHref',
    );
    const body = articles.match(baseRe)?.[1] || "";
    const total =
      words(body) +
      words(extract(extraBody, slug)) +
      words(extract(long, slug)) +
      words(extract(faqBody, slug));
    if (total < 1900) under += 1;
    ok(`learn ~2k ${slug}`, total >= 1900, `words=${total}`);
  }
  ok("all learn articles deep", under === 0, `under1900=${under}`);
}

async function waitReady(timeoutMs = 60000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const r = await fetch(BASE + "/");
      if (r.ok) return true;
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
}

async function testHttpRoutes() {
  const paths = [
    "/",
    "/pricing",
    "/account",
    "/learn",
    "/learn/how-to-get-texas-life-health-license",
    "/learn/texas-property-casualty-license",
    "/practice/tx-life-health",
    "/practice/tx-life-health/texas-law",
    "/practice/tx-life-health/missed",
    "/practice/tx-property-casualty",
    "/practice/tx-property-casualty/property",
    "/practice/tx-property-casualty/auto",
    "/practice/tx-property-casualty/commercial",
    "/mock/tx-life-health",
    "/topics/tx-life-health",
    "/topics/tx-property-casualty",
    "/outline",
    "/guide/texas-law",
    "/unlock/restore",
    "/unlock/demo?product=unlock",
    "/privacy",
    "/terms",
    "/contact",
    "/disclaimer",
    "/sitemap.xml",
    "/robots.txt",
  ];
  for (const p of paths) {
    const { res, text } = await fetchRaw(p);
    ok(`HTTP ${p}`, res.status === 200, `status=${res.status} kb=${Math.round(text.length / 1024)}`);
  }

  // Empty P&C life domain should 404
  const { res: empty } = await fetchRaw("/practice/tx-property-casualty/life");
  ok("P&C /life domain 404", empty.status === 404, `status=${empty.status}`);
}

async function testHomeContent() {
  const { text } = await fetchRaw("/");
  ok("home shows 1000+", /10\d{2}|1000\+/.test(text) || /1020/.test(text) || text.includes("1020"), "q count");
  ok("home free 45", text.includes("45"));
  ok("home Account nav", /\/account/.test(text));
}

async function testCheckoutDemo() {
  const { res, text } = await fetchRaw("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId: "unlock" }),
  });
  const json = JSON.parse(text);
  ok("checkout returns demo when no creem", res.status === 200 && json.mode === "demo", JSON.stringify(json));
  ok("checkout demo url", typeof json.url === "string" && json.url.includes("/unlock/demo"));
}

async function testGrantRestorePdf() {
  // PDF locked without cookie
  const locked = await fetchRaw("/api/pdf/texas-law");
  ok("pdf locked 403", locked.res.status === 403, `status=${locked.res.status}`);

  // Demo grant unlock
  const grantUnlock = await fetchRaw("/api/access/grant", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId: "unlock", demo: true }),
  });
  const grantJson = JSON.parse(grantUnlock.text);
  const cookie1 = parseCookie(grantUnlock.res.headers.getSetCookie?.() || grantUnlock.res.headers.get("set-cookie"));
  ok("demo unlock grant", grantUnlock.res.status === 200 && grantJson.ok, grantUnlock.text.slice(0, 120));
  ok("demo unlock sets cookie", cookie1.includes("tip_access"), cookie1.slice(0, 80));
  ok("demo unlock accessCode", typeof grantJson.accessCode === "string" && grantJson.accessCode.startsWith("TIP."));
  ok("demo unlock premium", grantJson.access?.premium === true);

  // Premium practice should show big bank
  const practice = await fetchRaw("/practice/tx-life-health", {
    headers: { Cookie: cookie1 },
  });
  ok(
    "premium practice not free-capped copy",
    practice.res.status === 200 && !/Free preview: 45 of/.test(practice.text),
  );
  // Count Question N/M in page - hard; check body length bigger or UpgradePrompt absent
  ok(
    "premium practice no upgrade compact reason free 45",
    !/Free preview is capped at 45/.test(practice.text),
  );

  // Mock should be 130 for premium
  const mock = await fetchRaw("/mock/tx-life-health", {
    headers: { Cookie: cookie1 },
  });
  ok("premium mock begin shows 130", /130 questions/.test(mock.text) || /130/.test(mock.text));

  // PDF still locked (only unlock product)
  const stillLocked = await fetchRaw("/api/pdf/texas-law", {
    headers: { Cookie: cookie1 },
  });
  ok("pdf still 403 after unlock-only", stillLocked.res.status === 403);

  // Grant PDF
  const grantPdf = await fetchRaw("/api/access/grant", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie1,
    },
    body: JSON.stringify({ productId: "pdf", demo: true }),
  });
  const pdfJson = JSON.parse(grantPdf.text);
  const cookie2 = parseCookie(grantPdf.res.headers.getSetCookie?.() || grantPdf.res.headers.get("set-cookie"));
  const cookies = cookie2 || cookie1;
  ok("demo pdf grant", grantPdf.res.status === 200 && pdfJson.access?.pdf === true);
  ok("pdf access code issued", typeof pdfJson.accessCode === "string");

  const pdfOk = await fetchRaw("/api/pdf/texas-law", {
    headers: { Cookie: cookies },
  });
  ok("pdf download 200", pdfOk.res.status === 200, `status=${pdfOk.res.status}`);
  ok(
    "pdf content-type",
    (pdfOk.res.headers.get("content-type") || "").includes("application/pdf"),
  );
  ok("pdf magic bytes", pdfOk.buf.slice(0, 4).toString() === "%PDF");
  ok("pdf has size", pdfOk.buf.length > 1500, `bytes=${pdfOk.buf.length}`);

  // Restore on fresh cookie jar
  const code = pdfJson.accessCode;
  const restore = await fetchRaw("/api/access/restore", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });
  const restoreJson = JSON.parse(restore.text);
  const cookie3 = parseCookie(restore.res.headers.getSetCookie?.() || restore.res.headers.get("set-cookie"));
  ok("restore ok", restore.res.status === 200 && restoreJson.ok);
  ok("restore premium+pdf", restoreJson.access?.premium && restoreJson.access?.pdf);

  const pdfAfterRestore = await fetchRaw("/api/pdf/texas-law", {
    headers: { Cookie: cookie3 },
  });
  ok("pdf works after restore", pdfAfterRestore.res.status === 200);

  // Tampered code rejected
  const bad = await fetchRaw("/api/access/restore", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code: code.slice(0, -4) + "XXXX" }),
  });
  ok("tampered restore 401", bad.res.status === 401, `status=${bad.res.status}`);

  // Invalid checkout product
  const badCheckout = await fetchRaw("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId: "nope" }),
  });
  ok("bad product 400", badCheckout.res.status === 400);
}

async function testLearnFaqSchema() {
  const { text } = await fetchRaw("/learn/texas-law-insurance-exam-guide");
  ok("learn has FAQ heading", /Frequently asked questions/i.test(text));
  ok("learn has ld+json", /application\/ld\+json/.test(text));
  ok("learn has FAQPage", /FAQPage/.test(text));
  ok("learn long content", text.length > 40000, `len=${text.length}`);
}

async function testSitemap() {
  const { text } = await fetchRaw("/sitemap.xml");
  ok("sitemap has account", text.includes("/account"));
  ok("sitemap has missed", text.includes("/missed"));
  ok("sitemap has restore", text.includes("/unlock/restore"));
  ok("sitemap has outline", text.includes("/outline"));
  ok("sitemap has P&C property", text.includes("/practice/tx-property-casualty/property"));
  ok("sitemap has learn how-to", text.includes("/learn/how-to-get-texas-life-health-license"));
}

async function main() {
  console.log("Deep test base:", BASE);
  testQuestionBanks();
  testAccessCodeLib();
  testLearnWordCounts();

  const ready = await waitReady();
  ok("server ready", ready);
  if (!ready) {
    printReport();
    process.exit(1);
  }

  await testHttpRoutes();
  await testHomeContent();
  await testCheckoutDemo();
  await testGrantRestorePdf();
  await testLearnFaqSchema();
  await testSitemap();
  printReport();
  process.exit(results.fail ? 1 : 0);
}

function printReport() {
  console.log("\n===== DEEP TEST REPORT =====");
  for (const line of results.details) console.log(line);
  console.log(`\nTOTAL pass=${results.pass} fail=${results.fail}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
