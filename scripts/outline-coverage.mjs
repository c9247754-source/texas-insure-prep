/**
 * Scores bank coverage against INSTX_LAH_TOPICS keyword map.
 * Run: node scripts/outline-coverage.mjs
 */
import fs from "fs";
import path from "path";

const root = process.cwd();
const outPath = path.join(root, "src/data/outline/coverage-report.json");

function loadTopicsFromTs() {
  const src = fs.readFileSync(
    path.join(root, "src/data/outline/instx-lah.ts"),
    "utf8",
  );
  const topics = [];
  const re =
    /\{\s*id:\s*"([^"]+)",\s*section:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*keywords:\s*\[([^\]]+)\]/g;
  let m;
  while ((m = re.exec(src))) {
    const keywords = [...m[4].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
    topics.push({ id: m[1], section: m[2], title: m[3], keywords });
  }
  return topics;
}

const topics = loadTopicsFromTs();
const blob = ["life.ts", "health.ts", "annuity.ts", "ethics.ts", "texas-law.ts"]
  .map((f) =>
    fs.readFileSync(path.join(root, "src/data/questions", f), "utf8"),
  )
  .join("\n")
  .toLowerCase();

const rows = topics.map((t) => {
  const hits = t.keywords.filter((k) => blob.includes(k.toLowerCase()));
  const score = hits.length / Math.max(1, t.keywords.length);
  return {
    id: t.id,
    section: t.section,
    title: t.title,
    keywordHits: hits.length,
    keywordTotal: t.keywords.length,
    score: Number(score.toFixed(2)),
    status: score >= 0.34 ? (score >= 0.66 ? "strong" : "ok") : "weak",
    missingKeywords: t.keywords.filter((k) => !blob.includes(k.toLowerCase())),
  };
});

const weak = rows.filter((r) => r.status === "weak");
const report = {
  generatedAt: new Date().toISOString(),
  source: {
    name: "Pearson VUE Texas Insurance Content Outlines",
    effective: "December 1, 2025",
    url: "https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/publications/124401.pdf",
  },
  totals: {
    topics: rows.length,
    strong: rows.filter((r) => r.status === "strong").length,
    ok: rows.filter((r) => r.status === "ok").length,
    weak: weak.length,
    coveragePct: Math.round(((rows.length - weak.length) / rows.length) * 100),
  },
  weak,
  rows,
};

fs.writeFileSync(outPath, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report.totals, null, 2));
console.log("Weak topics:");
for (const w of weak) {
  console.log(
    "-",
    w.id,
    "|",
    w.title,
    "| missing:",
    w.missingKeywords.slice(0, 5).join("; "),
  );
}
