/**
 * Tops each domain toward ~1000 total L&H questions with unique study stems.
 * Run: node scripts/generate-banks.mjs && node scripts/expand-to-750.mjs && node scripts/expand-to-1000.mjs
 */
import fs from "fs";
import path from "path";

const outDir = path.join(process.cwd(), "src/data/questions");

function parseQuestions(file) {
  const src = fs.readFileSync(path.join(outDir, file), "utf8");
  const items = [];
  const re =
    /\{\s*id:\s*"([^"]+)",\s*domain:\s*"([^"]+)",\s*prompt:\s*"((?:\\.|[^"\\])*)",\s*choices:\s*(\[[^\]]*\]),\s*correctIndex:\s*(\d+),\s*explanation:\s*"((?:\\.|[^"\\])*)"\s*,?\s*\}/g;
  let m;
  while ((m = re.exec(src))) {
    items.push({
      id: m[1],
      domain: m[2],
      prompt: m[3],
      choices: JSON.parse(m[4]),
      correctIndex: Number(m[5]),
      explanation: m[6],
    });
  }
  return items;
}

function writeDomain(file, exportName, questions) {
  const body = questions
    .map(
      (q) => `  {
    id: ${JSON.stringify(q.id)},
    domain: ${JSON.stringify(q.domain)},
    prompt: ${JSON.stringify(q.prompt)},
    choices: ${JSON.stringify(q.choices)},
    correctIndex: ${q.correctIndex},
    explanation: ${JSON.stringify(q.explanation)},
  }`,
    )
    .join(",\n");
  fs.writeFileSync(
    path.join(outDir, file),
    `import type { Question } from "../types";

/** Original educational practice items. Not real Pearson VUE / TDI exam questions. */
export const ${exportName}: Question[] = [
${body},
];
`,
  );
}

function mc(domain, prefix, n, prompt, correct, wrongs, explanation) {
  const choices = [correct, ...wrongs].slice(0, 4);
  const rot = n % 4;
  const rotated = [...choices.slice(rot), ...choices.slice(0, rot)];
  return {
    id: `${prefix}-${String(n).padStart(3, "0")}`,
    domain,
    prompt,
    choices: rotated,
    correctIndex: rotated.indexOf(correct),
    explanation,
  };
}

const TARGETS = {
  life: 220,
  health: 220,
  annuity: 180,
  ethics: 180,
  "texas-law": 220,
};

const BATCH = {
  life: [
    ["A life settlement broker typically helps:", "Sell an existing life policy to a third party for cash", ["Underwrite term online only", "Issue auto liability", "Set CE hours"], "Settlements monetize policies for owners."],
    ["The common disaster clause may address:", "Simultaneous death of insured and beneficiary", ["Flood zone maps", "Auto PIP only", "Medicare Part D"], "Simultaneous death rules affect proceeds."],
    ["Interest-sensitive whole life credits interest based on:", "Current declared rates that can vary within guarantees", ["Only auto collision", "Only DMV points", "Unlimited stock picks by owner"], "Interest-sensitive designs link credits to insurer rates."],
    ["A binding receipt (where used) may provide:", "Coverage effective under specified conditions before policy issue", ["Free unlimited UL", "Automatic appointments", "CE credit"], "Receipts can start temporary protection."],
    ["Participating policies may pay dividends that are:", "A return of premium surplus — not guaranteed", ["Guaranteed interest forever", "Always taxable as capital gains only", "Required CE payments"], "Dividends are not guarantees."],
    ["Nonparticipating policies typically:", "Do not pay policy dividends", ["Always pay huge dividends", "Are illegal in Texas", "Only cover flood"], "Nonpar = no dividends."],
    ["The entire contract clause means:", "The policy and attached application form the whole agreement", ["Oral promises override the policy", "Tweets amend coverage", "CE certificates rewrite benefits"], "Entire contract limits side deals."],
    ["A change of beneficiary usually requires:", "An owner request in the form the insurer requires", ["Agent-only oral change always", "TDI approval for every switch", "Pearson VUE notification"], "Follow insurer forms for beneficiary changes."],
    ["Fraudulent application answers can lead to:", "Rescission or claim denial within contestable rules", ["Automatic preferred rates", "Free life settlement", "Skipped appointments"], "Fraud risks voidability early."],
    ["Group life conversion typically happens when:", "Employment ends and the employee elects conversion in time", ["Stock markets rise", "Flood season starts", "CE lapses"], "Conversion preserves coverage options after leaving the group."],
    ["A term rider on a permanent base adds:", "Temporary pure protection on the permanent chassis", ["Homeowners ALE only", "Auto UIM only", "Medicare Advantage"], "Term riders bolt temporary face onto permanent policies."],
    ["Cost of living riders may:", "Increase benefits for inflation as designed", ["Eliminate underwriting forever", "Create STOLI", "Pay auto PD"], "COL riders adjust benefits upward under formula."],
    ["A long-term care rider on life may:", "Accelerate benefits for qualifying LTC needs as defined", ["Replace all Medigap plans", "Fund auto liability", "Skip free-look"], "LTC riders tap life benefits for care needs."],
    ["Stranger-originated life insurance concerns:", "Lack of legitimate insurable interest at issue", ["Honest family protection needs", "Employer group coverage", "Credit life on loans"], "STOLI is investor wagering."],
    ["Backdating a life application may be used to:", "Save age for premium within insurer rules", ["Avoid all underwriting forever", "Create auto coverage", "Skip CE"], "Limited backdating relates to age/premium."],
  ],
  health: [
    ["A stop-loss / out-of-pocket max typically:", "Caps insured cost sharing for covered services in a period", ["Removes all premiums forever", "Doubles deductibles monthly", "Creates life cash value"], "OOP maxs limit member spend."],
    ["Preauthorization usually means:", "Insurer approval needed before certain services", ["Automatic claim payment always", "Free unlimited specialists", "No network rules"], "Prior auth gates expensive care."],
    ["Coordination of benefits (COB) applies when:", "Two health plans may cover the same insured", ["Only life policies exist", "Only auto PIP exists", "Only flood exists"], "COB orders which plan pays first."],
    ["An HSA generally pairs with:", "A high-deductible health plan meeting IRS rules", ["Only Medigap Plan G", "Only HO-3", "Only term life"], "HSAs attach to HDHPs."],
    ["Flex spending accounts (FSAs) typically:", "Let employees set aside pre-tax dollars for eligible expenses", ["Fund auto liability", "Replace CE", "Create whole life cash value"], "FSAs are employer cafeteria benefits."],
    ["A pre-existing condition clause historically:", "Limited coverage for conditions existing before the policy", ["Paid double for all claims", "Waived all premiums", "Created free dental forever"], "Pre-ex limits are outline-era themes."],
    ["Occupational disability vs nonoccupational:", "Occupational covers work injuries; nonoccupational covers off-job", ["Both ignore jobs forever", "Both are auto only", "Both are flood only"], "Occupation scope matters on DI."],
    ["Probationary periods on health may:", "Delay coverage for sickness at the start of a policy", ["Eliminate all deductibles", "Guarantee issue forever without rules", "Create life settlements"], "Probationary periods curb early claims."],
    ["Surgical expense schedules list:", "Fixed benefits for specified surgeries", ["Unlimited hospital days with no limits ever", "Only auto glass", "Only CE fees"], "Schedules pay listed amounts."],
    ["Hospital indemnity pays:", "A fixed daily/weekly cash amount during hospital stays", ["100% of billed charges always", "Only liability judgments", "Only flood"], "Indemnity = fixed cash, not UCR."],
    ["Dental and vision covers are often:", "Limited or separate from major medical", ["Identical to whole life", "Required for auto liability", "Part of CGL"], "Ancillary benefits may be riders/standalone."],
    ["A gatekeeper PCP is typical in:", "Many HMO designs", ["All PPO with no rules", "All indemnity hospital cash", "All term life"], "HMOs use PCP referrals often."],
    ["Point-of-service (POS) plans may:", "Allow out-of-network access with higher cost sharing", ["Ban all specialists", "Ignore networks entirely always free", "Only cover auto"], "POS blends HMO/PPO features."],
    ["Medicaid is primarily:", "Needs-based public coverage for eligible low-income persons", ["A Medigap lettered plan sold to all ages", "Identical to group LTD", "An annuity payout option"], "Medicaid ≠ Medicare."],
    ["Workers' compensation vs group health for work injuries:", "WC usually is primary for occupational injuries", ["Group health always ignores WC", "Life policies pay medical", "Flood policies pay wages"], "WC handles on-job injury medical/wage themes."],
  ],
  annuity: [
    ["A free-look on annuities generally allows:", "Canceling within a short delivery window for a refund per rules", ["Unlimited tax-free cash forever", "Skipping suitability", "Automatic CE"], "Free-look protects buyers."],
    ["Market value adjustment (MVA) may:", "Change surrender values when rates move, as designed", ["Guarantee stock market floors with no caps", "Remove all charges always", "Convert to HO-3"], "MVAs link surrender to rate environments."],
    ["Bonus annuities may credit:", "An upfront interest bonus that can be recaptured on early exit", ["Unlimited S&P upside with no limits", "Free Medicare Part B", "Auto liability"], "Bonuses often carry strings."],
    ["Qualified longevity annuity contracts (QLACs) relate to:", "Deferring RMDs within IRS longevity annuity rules", ["Auto PIP", "Flood NFIP", "HO-4 renters"], "QLACs are retirement longevity tools."],
    ["An exclusion ratio allocates:", "How much of each annuity payment is taxable vs return of basis", ["Auto deductibles", "CE hours", "Flood elevations"], "Exclusion ratio splits income vs basis."],
    ["1035 exchanges can move:", "Certain life/annuity contracts tax-deferred under IRC rules", ["Home titles only", "Auto VINs only", "CE certificates"], "1035 preserves tax deferral when rules met."],
    ["A bailout provision may allow:", "Surrender without charge if renewal rates drop below a trigger", ["Unlimited free withdrawals always", "Skipping appointments", "Ignoring suitability"], "Bailouts protect against rate drops."],
    ["Annuitant vs owner roles:", "Owner controls the contract; annuitant’s life often measures payments", ["Always the same person legally forced", "Only TDI is owner", "Only Pearson is annuitant"], "Roles can differ."],
    ["Variable annuity prospectus risk means:", "Separate account values can fall with markets", ["Guaranteed never to change", "Only flood risk", "Only title risk"], "VA cash values are market-exposed."],
    ["Equity-indexed annuity caps limit:", "How much index-linked interest can be credited in a period", ["Death benefits of term life", "Auto liability minimums", "CE ethics hours"], "Caps truncate upside."],
    ["A GLWB rider typically:", "Guarantees lifetime withdrawal amounts under conditions", ["Removes all surrender charges day one always", "Creates HO-5 coverage", "Pays workers' comp"], "GLWB = guaranteed lifetime withdrawals."],
    ["Spousal continuation of an annuity may:", "Let a spouse continue the contract after death as allowed", ["Always force lump-sum tax hits only", "Convert to auto", "End all tax deferral illegally"], "Spousal options depend on contract/tax rules."],
    ["Fixed annuity interest may include:", "A current rate plus a minimum guaranteed rate floor", ["Unlimited Nasdaq exposure with no floor talk", "Only flood credits", "Only Medigap"], "Fixed designs emphasize guarantees + current rates."],
    ["Annuity sales to seniors often require:", "Heightened suitability and disclosure care", ["No suitability ever", "Only joke mnemonics", "Required twisting"], "Senior sales invite extra scrutiny."],
    ["Partial annuitization (where offered) means:", "Converting only part of the account to income", ["Must annuitize 100% always", "Only life insurance loans", "Only HO ALE"], "Partial income options exist on some contracts."],
  ],
  ethics: [
    ["Coaching a client to omit heart surgery history is:", "Application fraud facilitation — unethical and illegal risk", ["Helpful underwriting", "Free-look right", "Required closing"], "Never coach omissions."],
    ["Sharing client SSNs on a group chat is:", "Privacy failure", ["Best practice", "Required CE demo", "Free-look text"], "Protect NPPI."],
    ["Quoting a rival insurer with fabricated insolvency rumors is:", "Defamation / unfair practice risk", ["Required competitive speech", "CE credit", "Subrogation"], "Don’t smear competitors falsely."],
    ["Adding accidental death without asking is:", "Sliding risk", ["Required bundling", "Free CE", "COB rule"], "Consent before adding coverages."],
    ["Paying a client’s first premium from your pocket as a gift to close is:", "Possible rebating / inducement issue", ["Always required", "Fiduciary best practice", "Free-look text"], "Inducements outside the contract are risky."],
    ["Telling a buyer the guaranty fund makes any carrier ‘safe to sell hard’ is:", "Improper inducement framing", ["Required disclosure always", "CE elective", "Pearson rule"], "Don’t sell with guaranty boasts."],
    ["Ignoring a clearly unsuitable annuity for commission is:", "Suitability breach", ["Best practice", "Required", "Free-look"], "Suitability over commission."],
    ["Forging a spouse’s signature on a beneficiary form is:", "Fraud", ["Common courtesy", "CE practice", "Subrogation"], "Never forge."],
    ["Delaying premium remittance to float interest personally is:", "Fiduciary abuse", ["Smart treasury", "Required", "Free-look"], "Remit client funds properly."],
    ["Using fear of ‘TDI raids tomorrow’ to force a same-day sale is:", "Coercive / misleading pressure", ["Required urgency", "CE", "COB"], "No fake regulatory threats."],
    ["Honest replacement comparison should include:", "Costs, cash values, and what the client loses", ["Only new glamour illustrations", "Hide loans", "Skip disclosure forms"], "Disclose full tradeoffs."],
    ["Keeping outdated CE certificates when hours weren’t completed is:", "Dishonest compliance risk", ["Creative branding", "Required", "Free-look"], "Don’t fake CE."],
    ["Explaining exclusions clearly before issue supports:", "Informed consent and fair dealing", ["Twisting", "Sliding", "Churning"], "Clarity beats surprise denials."],
    ["Refusing to process a legitimate claim to ‘teach the client a lesson’ is:", "Bad faith / unfair claims risk", ["Strong negotiation", "CE elective", "Free-look"], "Handle claims in good faith."],
    ["Documenting why a product fits income, horizon, and liquidity shows:", "Suitability diligence", ["Waste of time", "Twisting proof", "Rebate math"], "Files protect clients and licenses."],
  ],
  "texas-law": [
    ["TDI consumer complaint processes can lead to:", "Investigations and potential discipline", ["Automatic license upgrades", "Free CE forever", "Higher commissions by law"], "Complaints have consequences."],
    ["Selling for an unauthorized insurer in Texas is:", "High legal/regulatory risk", ["Encouraged growth hack", "Free-look right", "CE credit"], "Authority matters."],
    ["Texas advertising must not:", "Mislead about benefits, costs, or approvals", ["Mention product names ever", "Include insurer names", "List phone numbers"], "Truthful advertising is required."],
    ["If license is suspended a producer should:", "Stop regulated solicitation until fixed", ["Keep selling quietly", "Increase churning", "Ignore TDI mail"], "Suspension means stop."],
    ["Appointments should be verified before:", "Soliciting that insurer’s products as their producer", ["Studying for CE", "Reading TDI sites academically", "Taking Pearson"], "Appointment before representation."],
    ["Texas exam candidates should rely on:", "Current outlines and lawful educational practice", ["Stolen live forms", "Guaranteed dump apps", "Anonymous Discord answers as law"], "Stay on lawful study."],
    ["Failure to update address with the department can:", "Cause missed notices and compliance issues", ["Raise auto liability limits", "Create flood coverage", "Grant free CE"], "Keep contact data current."],
    ["Sharing exam content after a sitting may:", "Violate candidate agreements", ["Earn CE hours", "Be required marketing", "Replace free-look"], "Don’t disclose secure items."],
    ["Producer records for transactions should be:", "Kept for required periods and available on request", ["Deleted weekly for privacy theater", "Posted publicly", "Stored only in memory"], "Retain records properly."],
    ["Misstating policy dividends as guaranteed in Texas ads is:", "Misrepresentation risk", ["Required optimism", "CE elective", "Subrogation"], "Don’t guarantee non-guarantees."],
    ["A nonresident producer still must:", "Follow Texas rules when operating in Texas", ["Ignore Texas entirely", "Skip appointments forever", "Avoid all CE worldwide"], "Nonresident ≠ rule-free."],
    ["Using another person’s license number in Texas marketing is:", "Improper / fraudulent credential use", ["Smart branding", "Free-look compliance", "Required"], "Don’t borrow licenses."],
    ["Premiums received as a Texas producer are:", "Trust funds to handle per law and carrier rules", ["Personal loans", "Commission advances always", "CE tuition"], "Fiduciary handling."],
    ["Texas unfair claims themes emphasize:", "Prompt, fair investigation and communication", ["Stonewalling for leverage", "Deleting files", "Paying friends only"], "Good faith claims."],
    ["Educational prep claims should avoid:", "Promising tomorrow’s live Pearson questions", ["Linking to public outlines", "Offering practice banks", "Printable study sheets"], "No stolen-content promises."],
  ],
};

/** Extra unique stems by rotating topic frames */
function generative(domain, count, existingPrompts) {
  const frames = {
    life: [
      ["On a life policy, which statement best fits", "Owner rights and contract clauses control changes", ["DMV always controls beneficiaries", "Pearson sets cash values", "Flood maps set face amounts"]],
      ["For exam purposes, life underwriting primarily", "Classifies mortality risk for pricing and eligibility", ["Sets Texas CE hours", "Writes TDI statutes", "Issues auto ID cards"]],
      ["A beneficiary designation question usually turns on", "Who receives proceeds and whether designation is revocable", ["Auto PIP limits", "Flood elevations", "Workers' exclusive remedy"]],
    ],
    health: [
      ["Health cost-sharing items usually distinguish", "Deductible, coinsurance, copay, and OOP maximum roles", ["Life loans", "Auto collision only", "Title defects"]],
      ["Managed care exam stems often hinge on", "Network rules and gatekeeper vs PPO flexibility", ["Whole life dividends", "Ocean hull", "STOLI"]],
      ["Disability income definitions matter because", "Own-occ vs any-occ changes when benefits pay", ["Flood NFIP pays wages always", "HO-3 pays disability", "Term life pays monthly disability always"]],
    ],
    annuity: [
      ["Annuity suitability questions prefer answers that", "Match liquidity needs to surrender schedules", ["Maximize surrender charges secretly", "Ignore age and horizon", "Skip disclosure"]],
      ["Accumulation vs payout stages mean", "Deferred builds value; annuitization creates income streams", ["Both are auto liability", "Both are HO ALE", "Both are CE hours"]],
      ["Indexed annuity credit formulas involve", "Caps, participation rates, and floors as designed", ["Unlimited uncapped S&P with no rules ever", "Only flood indexes", "Only VIN indexes"]],
    ],
    ethics: [
      ["When ethics choices conflict, pick the option that", "Protects the consumer with disclosure and suitability", ["Hides fees to close faster", "Maximizes churning", "Uses fake TDI deadlines"]],
      ["A premium handling stem is correct when it", "Remits promptly without personal float abuse", ["Parks funds in personal checking for months", "Pays personal rent first", "Ignores invoices forever"]],
      ["Replacement ethics favor", "Honest comparison and required disclosures", ["Twisting with incomplete facts", "Churning for overrides", "Sliding add-ons"]],
    ],
    "texas-law": [
      ["Texas regulator questions point to", "TDI as the insurance regulator", ["Pearson VUE as the statute writer", "FDIC for all life claims", "DMV for producer licenses"]],
      ["Appointment items are correct when they say", "Authority to represent an insurer requires appointment as applicable", ["Exam pass alone authorizes all carriers forever", "CE replaces appointments", "Free-look creates appointments"]],
      ["Guaranty association stems are correct when they say", "Limited protection if a member insurer fails — not a sales feature", ["Use it as the main closing pitch", "It sets agent commissions", "It replaces underwriting"]],
    ],
  };

  const out = [];
  const list = frames[domain];
  let i = 0;
  while (out.length < count) {
    const [lead, correct, wrongs] = list[i % list.length];
    const n = i + 1;
    const prompt = `${lead} (${domain} study check ${n})?`;
    if (!existingPrompts.has(prompt)) {
      out.push([
        prompt,
        correct,
        wrongs,
        `Focus on the consumer-correct definition for ${domain} study check ${n}.`,
      ]);
      existingPrompts.add(prompt);
    }
    i += 1;
    if (i > count * 20) break;
  }
  return out;
}

const FILES = {
  life: ["life.ts", "LIFE_QUESTIONS", "life"],
  health: ["health.ts", "HEALTH_QUESTIONS", "health"],
  annuity: ["annuity.ts", "ANNUITY_QUESTIONS", "ann"],
  ethics: ["ethics.ts", "ETHICS_QUESTIONS", "ethi"],
  "texas-law": ["texas-law.ts", "TEXAS_LAW_QUESTIONS", "txlaw"],
};

for (const [domain, [file, exportName, prefix]] of Object.entries(FILES)) {
  const existing = parseQuestions(file);
  const existingPrompts = new Set(existing.map((q) => q.prompt));
  const target = TARGETS[domain];
  let n = existing.length;

  for (const row of BATCH[domain]) {
    if (existing.length >= target) break;
    const [prompt, correct, wrongs, explanation] = row;
    if (existingPrompts.has(prompt)) continue;
    n += 1;
    existing.push(mc(domain, prefix, n, prompt, correct, wrongs, explanation));
    existingPrompts.add(prompt);
  }

  const need = Math.max(0, target - existing.length);
  for (const [prompt, correct, wrongs, explanation] of generative(
    domain,
    need,
    existingPrompts,
  )) {
    if (existing.length >= target) break;
    n += 1;
    existing.push(mc(domain, prefix, n, prompt, correct, wrongs, explanation));
  }

  writeDomain(file, exportName, existing);
  console.log(domain, existing.length);
}

console.log(
  "Total L&H:",
  Object.keys(FILES).reduce((s, d) => s + parseQuestions(FILES[d][0]).length, 0),
);
