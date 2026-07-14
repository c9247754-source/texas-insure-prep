import type { ExamTrack, Question } from "../types";

export const TX_LIFE_HEALTH_TRACK: ExamTrack = {
  slug: "tx-life-health",
  title: "Texas Life, Accident & Health",
  shortTitle: "TX Life & Health",
  description:
    "Free practice for the Texas General Lines Life, Accident and Health exam (InsTX-LAH). Study general concepts plus Texas-specific rules that trip up first-time takers.",
  scoredQuestions: 130,
  timeMinutes: 150,
  passingScore: 70,
  outlineNote:
    "Public exam structure: roughly 100 general + 30 Texas law scored items (plus pretest items). This site uses original practice questions for study only.",
};

/**
 * Original educational practice items aligned to publicly known exam themes.
 * Not real Pearson VUE / TDI exam questions.
 */
export const TX_LIFE_HEALTH_QUESTIONS: Question[] = [
  {
    id: "lh-001",
    domain: "life",
    prompt:
      "A whole life policy is designed primarily to provide which outcome if premiums are paid as required?",
    choices: [
      "Coverage that ends at a fixed term with no cash value",
      "Permanent coverage with a cash value that grows over time",
      "Coverage only for accidental death before age 65",
      "Temporary coverage that automatically converts to health insurance",
    ],
    correctIndex: 1,
    explanation:
      "Whole life is a permanent policy that builds cash value while premiums remain paid as scheduled.",
  },
  {
    id: "lh-002",
    domain: "life",
    prompt:
      "Which life insurance provision allows the insurer to void the contract for material misrepresentation discovered within a limited early period?",
    choices: [
      "Grace period",
      "Incontestability clause",
      "Contestable period / application misrepresentation rules",
      "Free-look period",
    ],
    correctIndex: 2,
    explanation:
      "During the early contestable window, insurers may challenge material misstatements. After incontestability applies, challenges are sharply limited.",
  },
  {
    id: "lh-003",
    domain: "life",
    prompt:
      "If a policyowner stops paying premiums on a cash-value life policy, which option commonly preserves some coverage without new premiums?",
    choices: [
      "Extended term or reduced paid-up nonforfeiture options",
      "Automatic conversion to long-term care insurance",
      "Mandatory surrender with no remaining benefit",
      "Transfer of the policy to the state’s guaranty association",
    ],
    correctIndex: 0,
    explanation:
      "Nonforfeiture options let owners keep reduced paid-up insurance or extended term coverage using built-up cash value.",
  },
  {
    id: "lh-004",
    domain: "life",
    prompt:
      "In life insurance, the primary purpose of a beneficiary designation is to:",
    choices: [
      "Identify who receives the death benefit proceeds",
      "Set the policy’s cash surrender value schedule",
      "Determine the agent’s commission split",
      "Replace the need for an insurable interest at issue",
    ],
    correctIndex: 0,
    explanation:
      "The beneficiary is the person or entity named to receive death proceeds when the insured dies.",
  },
  {
    id: "lh-005",
    domain: "life",
    prompt:
      "Term life insurance is best described as coverage that:",
    choices: [
      "Builds significant cash value from day one",
      "Provides protection for a set period and typically has little or no cash value",
      "Must include annuity payout options",
      "Is only sold to people over age 65",
    ],
    correctIndex: 1,
    explanation:
      "Term life buys pure protection for a defined period and usually does not accumulate meaningful cash value.",
  },
  {
    id: "lh-006",
    domain: "life",
    prompt:
      "What does the free-look (right to examine) provision generally give the policyowner?",
    choices: [
      "A short period after delivery to cancel and receive a refund",
      "Unlimited time to cancel with a full refund of premiums",
      "Authority to change underwriting guidelines",
      "Automatic waiver of premiums for disability",
    ],
    correctIndex: 0,
    explanation:
      "Free-look lets a new owner review the policy for a limited time and cancel for a refund if dissatisfied.",
  },
  {
    id: "lh-007",
    domain: "life",
    prompt:
      "Which party must generally have an insurable interest in the insured’s life at the time a life policy is issued?",
    choices: [
      "Only the named contingent beneficiary",
      "The applicant / policyowner (and often the insured relationship at issue)",
      "Any stranger who wants investment returns",
      "The claim adjuster who later pays the claim",
    ],
    correctIndex: 1,
    explanation:
      "Insurable interest is required at issue to discourage wagering on another person’s life.",
  },
  {
    id: "lh-008",
    domain: "life",
    prompt:
      "A life policy’s grace period is best understood as:",
    choices: [
      "Extra time after a missed premium during which coverage generally continues",
      "The period before underwriting begins",
      "Time allowed to rewrite another company’s exam",
      "A mandatory waiting period before suicide coverage applies forever",
    ],
    correctIndex: 0,
    explanation:
      "Grace periods keep coverage in force for a short time after a due premium is unpaid, protecting against unintended lapse.",
  },
  {
    id: "lh-009",
    domain: "health",
    prompt:
      "Which health insurance concept describes the portion of covered medical costs the insured pays after the deductible is met, up to an out-of-pocket limit?",
    choices: [
      "Elimination period",
      "Coinsance or coinsurance cost-sharing",
      "Gatekeeper referral only",
      "Residual disability benefit",
    ],
    correctIndex: 1,
    explanation:
      "Coinsurance is the percentage split of covered expenses between insurer and insured after the deductible.",
  },
  {
    id: "lh-010",
    domain: "health",
    prompt:
      "A disability income policy’s elimination (waiting) period is primarily:",
    choices: [
      "The time after disability begins before benefits start paying",
      "The time before an applicant can buy insurance",
      "The period when premiums are always waived automatically at issue",
      "A permanent ban on coverage after age 50",
    ],
    correctIndex: 0,
    explanation:
      "Elimination periods act like a time deductible: benefits begin only after the insured remains disabled for that period.",
  },
  {
    id: "lh-011",
    domain: "health",
    prompt:
      "Major medical expense policies typically emphasize which combination?",
    choices: [
      "High maximum benefits with deductibles and coinsurance",
      "Only scheduled indemnity for hospital room and board with no out-of-pocket costs",
      "Coverage limited exclusively to dental implants",
      "Cash value accumulation like whole life",
    ],
    correctIndex: 0,
    explanation:
      "Major medical designs use cost sharing (deductible/coinsurance) with relatively high benefit ceilings for serious medical costs.",
  },
  {
    id: "lh-012",
    domain: "health",
    prompt:
      "In group health insurance, a probationary or waiting period for new employees usually means:",
    choices: [
      "Time before new hires become eligible for plan coverage",
      "Time after a claim before the insurer can investigate fraud",
      "The free-look period on individual life policies",
      "A requirement to wait one year after a denied claim to reapply statewide",
    ],
    correctIndex: 0,
    explanation:
      "Employers often make new employees wait a short period before group health enrollment begins.",
  },
  {
    id: "lh-013",
    domain: "health",
    prompt:
      "Which statement about HMOs is generally accurate compared with indemnity major medical?",
    choices: [
      "HMOs often emphasize network providers and may use primary care gatekeepers",
      "HMOs never cover preventive care",
      "HMOs always reimburse any provider worldwide at 100%",
      "HMOs are identical to pure term life contracts",
    ],
    correctIndex: 0,
    explanation:
      "HMOs organize care through networks and often require PCP referrals for specialists.",
  },
  {
    id: "lh-014",
    domain: "health",
    prompt:
      "A coordination of benefits (COB) provision in health insurance is designed to:",
    choices: [
      "Prevent duplicate recovery when two policies cover the same claim",
      "Increase commissions when two agents write the same insured",
      "Force every claim to be paid by Medicare first regardless of age",
      "Eliminate deductibles for all dependents forever",
    ],
    correctIndex: 0,
    explanation:
      "COB rules order which plan pays first so total benefits don’t exceed covered expenses.",
  },
  {
    id: "lh-015",
    domain: "health",
    prompt:
      "Long-term care insurance commonly helps pay for:",
    choices: [
      "Assistance with activities of daily living and custodial care settings",
      "Only emergency room acute trauma for people under 30",
      "Stock market losses in a brokerage account",
      "Auto collision damage after an accident",
    ],
    correctIndex: 0,
    explanation:
      "LTC policies target care needs such as ADL assistance in facilities or home settings, not acute short-term hospital events alone.",
  },
  {
    id: "lh-016",
    domain: "annuity",
    prompt:
      "A deferred annuity is primarily used to:",
    choices: [
      "Accumulate funds for later periodic income, often for retirement",
      "Provide pure life insurance death benefit only",
      "Replace automobile liability coverage",
      "Insure against hospital room charges exclusively",
    ],
    correctIndex: 0,
    explanation:
      "Deferred annuities accumulate value during a deferral period and can later provide income payments.",
  },
  {
    id: "lh-017",
    domain: "annuity",
    prompt:
      "In a fixed annuity, the insurer generally guarantees:",
    choices: [
      "A minimum interest crediting / stated payout basis subject to contract terms",
      "Unlimited equity market upside with no downside risk language",
      "That premiums equal Medicare Part B premiums",
      "Tax-free withdrawals of all gains at any age with no rules",
    ],
    correctIndex: 0,
    explanation:
      "Fixed annuities credit interest under contract guarantees and insurer general-account obligations, unlike pure market ETFs.",
  },
  {
    id: "lh-018",
    domain: "annuity",
    prompt:
      "Which risk is most closely associated with an immediate life annuity payout chosen for lifetime income?",
    choices: [
      "Longevity risk transfer — payments continue for life as designed",
      "Eliminating the need for any disclosure at sale",
      "Guaranteeing stock index returns identical to the S&P every year",
      "Automatic conversion into a term life policy",
    ],
    correctIndex: 0,
    explanation:
      "Life annuities help manage the risk of outliving savings by promising lifetime income under contract terms.",
  },
  {
    id: "lh-019",
    domain: "annuity",
    prompt:
      "A key suitability concern when recommending annuities is:",
    choices: [
      "Whether the product fits the buyer’s liquidity needs, time horizon, and risk tolerance",
      "Whether the agent can earn the highest commission available in any state",
      "Whether the buyer owns a home in another country",
      "Whether the buyer’s favorite color matches the brochure",
    ],
    correctIndex: 0,
    explanation:
      "Suitability focuses on customer needs, time horizon, liquidity, and risk — not producer compensation alone.",
  },
  {
    id: "lh-020",
    domain: "ethics",
    prompt:
      "Twisting in life insurance sales generally refers to:",
    choices: [
      "Misleading a client into replacing a policy to the client’s disadvantage",
      "Offering a free look period as required by law",
      "Delivering a policy in person with a delivery receipt",
      "Explaining nonforfeiture options accurately",
    ],
    correctIndex: 0,
    explanation:
      "Twisting is an unfair practice involving deceptive replacement that harms the policyholder.",
  },
  {
    id: "lh-021",
    domain: "ethics",
    prompt:
      "Rebating typically involves:",
    choices: [
      "Giving an applicant something of value not in the contract to induce a purchase, when prohibited",
      "Paying a claim owed under the policy",
      "Providing a state-approved outline of coverage",
      "Reporting continuing education hours on time",
    ],
    correctIndex: 0,
    explanation:
      "Illegal rebating is inducing a sale with improper side benefits outside the filed contract.",
  },
  {
    id: "lh-022",
    domain: "ethics",
    prompt:
      "An agent who knowingly makes a false statement on an application to get a policy issued is engaging in:",
    choices: [
      "Fraudulent or material misrepresentation conduct",
      "Ordinary free-look exercise",
      "Required replacement disclosure only",
      "Standard nonforfeiture election",
    ],
    correctIndex: 0,
    explanation:
      "Falsifying application information to obtain coverage is dishonest and can be illegal fraud.",
  },
  {
    id: "lh-023",
    domain: "ethics",
    prompt:
      "Fiduciary responsibility for an insurance producer generally means:",
    choices: [
      "Handling premiums and client interests with honesty and care",
      "Always placing the insurer’s sales quota first regardless of fitness",
      "Never explaining exclusions to applicants",
      "Ignoring state advertising rules if production is high",
    ],
    correctIndex: 0,
    explanation:
      "Producers are expected to safeguard premium funds and treat customers honestly.",
  },
  {
    id: "lh-024",
    domain: "ethics",
    prompt:
      "Which practice is most consistent with fair claims handling expectations?",
    choices: [
      "Investigate and communicate claim decisions in good faith within required timeframes",
      "Delay every claim indefinitely to improve company cash flow",
      "Refuse to acknowledge receipt of claim forms on purpose",
      "Require claimants to buy a new policy before paying valid claims",
    ],
    correctIndex: 0,
    explanation:
      "Fair claims practices require prompt, good-faith investigation and communication.",
  },
  {
    id: "lh-025",
    domain: "texas-law",
    prompt:
      "In Texas, the agency that primarily regulates insurance companies and licensing is the:",
    choices: [
      "Texas Department of Insurance (TDI)",
      "Federal Reserve Board only",
      "Texas Education Agency",
      "U.S. Postal Service",
    ],
    correctIndex: 0,
    explanation:
      "TDI is the state regulator for insurance markets, insurers, and producer licensing in Texas.",
  },
  {
    id: "lh-026",
    domain: "texas-law",
    prompt:
      "A major reason Texas Life & Health candidates should study state-specific material is that roughly:",
    choices: [
      "A meaningful share of scored items focuses on Texas law and rules",
      "The exam contains only math and no insurance concepts",
      "Texas never tests general insurance principles",
      "Pearson VUE ignores Texas Insurance Code topics",
    ],
    correctIndex: 0,
    explanation:
      "Public outlines split general knowledge and Texas-specific law — state items are a common failure point.",
  },
  {
    id: "lh-027",
    domain: "texas-law",
    prompt:
      "The Texas Life & Health Guaranty Association exists primarily to:",
    choices: [
      "Help protect policyholders if a member insurer becomes insolvent (within statutory limits)",
      "Set agent commission schedules statewide",
      "Issue new producer licenses directly to the public",
      "Replace Medicare for all Texas residents under 65",
    ],
    correctIndex: 0,
    explanation:
      "Guaranty associations provide limited statutory protection when a licensed insurer fails.",
  },
  {
    id: "lh-028",
    domain: "texas-law",
    prompt:
      "Which statement about Texas producer licensing exams is accurate based on publicly reported patterns?",
    choices: [
      "First-time pass rates for General Lines Life & Health are often near the mid-50% range",
      "Virtually all first-time candidates score 100%",
      "Texas abolished the written exam for all life licenses",
      "Only lawyers may sit for Life & Health exams",
    ],
    correctIndex: 0,
    explanation:
      "Pearson VUE / TDI pass-rate releases have repeatedly shown Life & Health first-time pass rates around the mid-50s.",
  },
  {
    id: "lh-029",
    domain: "texas-law",
    prompt:
      "Unlike some other states, Texas is widely known for which pre-licensing feature for many insurance lines?",
    choices: [
      "No mandatory pre-licensing education hours for certain lines before the exam",
      "A requirement of 400 classroom hours before every exam attempt",
      "A ban on any exam prep materials",
      "Exams administered only once per decade",
    ],
    correctIndex: 0,
    explanation:
      "Texas is notable for allowing many candidates to sit without mandatory pre-license coursework (prep is still strongly recommended).",
  },
  {
    id: "lh-030",
    domain: "texas-law",
    prompt:
      "Continuing education (CE) for Texas licensed agents is generally required to:",
    choices: [
      "Maintain an active license by completing approved hours each renewal cycle",
      "Replace the need to ever pass an initial exam",
      "Allow agents to ignore unfair trade practice laws",
      "Automatically raise a policy’s death benefit each year",
    ],
    correctIndex: 0,
    explanation:
      "Licensees must meet CE requirements to renew and stay compliant with TDI rules.",
  },
  {
    id: "lh-031",
    domain: "texas-law",
    prompt:
      "When an agent recommends replacing an existing life policy, which professional duty applies?",
    choices: [
      "Provide required replacement disclosures / comparisons and avoid misleading statements",
      "Hide the existing policy cash value from the client",
      "Always say the old policy is worthless without review",
      "Skip suitability because replacements are never regulated",
    ],
    correctIndex: 0,
    explanation:
      "Replacement sales trigger disclosure and fairness duties to prevent harmful twisting.",
  },
  {
    id: "lh-032",
    domain: "texas-law",
    prompt:
      "Advertising for insurance in Texas should generally be:",
    choices: [
      "Clear, truthful, and not misleading about benefits or costs",
      "Allowed to invent benefits not in the policy if sales increase",
      "Required to promise guaranteed investment returns like stocks",
      "Exempt from all state review if published on social media",
    ],
    correctIndex: 0,
    explanation:
      "State rules require insurance advertising to be truthful and not deceptive.",
  },
  {
    id: "lh-033",
    domain: "life",
    prompt:
      "A renewable term policy typically allows the insured to:",
    choices: [
      "Renew coverage for additional terms without new evidence of insurability (as contract allows)",
      "Convert the policy into a home mortgage automatically",
      "Skip all future premiums after year one",
      "Name the insurance commissioner as owner by default",
    ],
    correctIndex: 0,
    explanation:
      "Renewable term preserves the right to continue coverage for defined periods without requalifying medically, usually with rising premiums.",
  },
  {
    id: "lh-034",
    domain: "life",
    prompt:
      "Convertible term insurance generally permits conversion to:",
    choices: [
      "A permanent life policy without proving new insurability, within stated limits",
      "An auto policy in another state",
      "A health HMO with no enrollment rules",
      "A futures contract on commodities",
    ],
    correctIndex: 0,
    explanation:
      "Conversion rights let term insureds move to permanent coverage without a new medical exam, subject to contract terms.",
  },
  {
    id: "lh-035",
    domain: "health",
    prompt:
      "An accidental death and dismemberment (AD&D) benefit typically pays for:",
    choices: [
      "Covered losses caused by accident as defined in the policy (e.g., death or specified dismemberment)",
      "Any death from illness after age 80",
      "Routine dental cleanings twice a year",
      "Long-term nursing home stay without triggers",
    ],
    correctIndex: 0,
    explanation:
      "AD&D is accident-focused; illness deaths and routine benefits are outside its usual design.",
  },
  {
    id: "lh-036",
    domain: "health",
    prompt:
      "A pre-existing condition clause (where still relevant under a plan design / older individual policies) historically sought to:",
    choices: [
      "Limit coverage for conditions that existed before coverage began for a waiting period",
      "Pay double benefits for all prior illnesses forever",
      "Ban anyone with a prior cold from buying term life",
      "Require employers to cover illegal activities",
    ],
    correctIndex: 0,
    explanation:
      "Pre-ex clauses delayed or limited benefits for conditions present before the policy effective date (rules vary by market and law).",
  },
  {
    id: "lh-037",
    domain: "ethics",
    prompt:
      "Defamation in insurance marketing generally means:",
    choices: [
      "Making false or malicious statements that injure another insurer’s or person’s reputation",
      "Comparing two policies fairly with accurate numbers",
      "Providing a required privacy notice",
      "Delivering a policy within the free-look window",
    ],
    correctIndex: 0,
    explanation:
      "Unfair trade practice rules prohibit false, malicious reputational attacks in the business of insurance.",
  },
  {
    id: "lh-038",
    domain: "texas-law",
    prompt:
      "If you fail the Texas Life & Health exam, public rules generally allow you to:",
    choices: [
      "Retake after paying another fee (retest rules per Pearson VUE / TDI)",
      "Never attempt the exam again in your lifetime",
      "Automatically receive a temporary all-lines license without testing",
      "Sue Pearson VUE for the passing score",
    ],
    correctIndex: 0,
    explanation:
      "Candidates may retest subject to scheduling and fee rules; there is no lifetime ban for a single failure.",
  },
  {
    id: "lh-039",
    domain: "life",
    prompt:
      "The suicide clause in many life policies typically:",
    choices: [
      "Limits the insurer’s liability if suicide occurs within a stated early period, often returning premiums",
      "Removes all coverage forever if the insured ever feels depressed",
      "Doubles the death benefit for suicide at any time",
      "Applies only to term policies sold in other countries",
    ],
    correctIndex: 0,
    explanation:
      "Suicide limitations usually apply for an initial period; afterward, death by suicide is often treated like other covered deaths, subject to contract language.",
  },
  {
    id: "lh-040",
    domain: "annuity",
    prompt:
      "Surrender charges on deferred annuities are mainly intended to:",
    choices: [
      "Discourage early withdrawals during the surrender period and recover acquisition costs",
      "Reward customers for canceling in week one",
      "Replace the need for any sales disclosure",
      "Guarantee FDA approval of the product",
    ],
    correctIndex: 0,
    explanation:
      "Surrender schedules reduce early cash-outs and help insurers amortize commissions and setup costs.",
  },
  {
    id: "lh-041",
    domain: "texas-law",
    prompt:
      "Which preparation strategy best matches how Texas exams are structured?",
    choices: [
      "Drill both national/general concepts and Texas law; don’t ignore the smaller state section",
      "Study only federal tax shelters and skip insurance terms",
      "Memorize another state’s auto policy forms only",
      "Avoid practice questions because outlines are secret forever",
    ],
    correctIndex: 0,
    explanation:
      "Candidates who dominate general topics but blank on Texas law still fail. Balance both sections.",
  },
  {
    id: "lh-042",
    domain: "health",
    prompt:
      "A stop-loss or out-of-pocket maximum provision is meant to:",
    choices: [
      "Cap the insured’s cost sharing for covered services in a period as defined by the plan",
      "Stop the insurer from ever paying claims",
      "Require unlimited coinsurance forever",
      "Cancel the policy after one doctor visit",
    ],
    correctIndex: 0,
    explanation:
      "Out-of-pocket maximums protect insureds from unlimited cost sharing on covered benefits.",
  },
  {
    id: "lh-043",
    domain: "ethics",
    prompt:
      "Controlled business concerns arise when:",
    choices: [
      "A producer writes a disproportionate share of coverage on themselves, family, or controlled interests vs. the public",
      "An agent sells only to strangers in open markets",
      "An insurer pays a valid death claim",
      "A candidate takes a free practice test online",
    ],
    correctIndex: 0,
    explanation:
      "Many states limit licenses used mainly to cover the producer’s own controlled interests rather than serving the public.",
  },
  {
    id: "lh-044",
    domain: "life",
    prompt:
      "Key person life insurance is typically purchased by a business to:",
    choices: [
      "Protect the firm against financial loss if a crucial employee or owner dies",
      "Provide free health coverage for all customers",
      "Satisfy auto minimum liability limits",
      "Pay the agent’s personal rent indefinitely",
    ],
    correctIndex: 0,
    explanation:
      "Key person policies indemnify the business for lost skills, relationships, or capital after a key person’s death.",
  },
  {
    id: "lh-045",
    domain: "texas-law",
    prompt:
      "After passing the required Texas licensing exam(s), a candidate still generally must:",
    choices: [
      "Complete licensing application / fingerprinting and appointment steps as TDI requires",
      "Begin selling any insurance line nationwide without a license",
      "Skip background checks forever",
      "Only register with the local chamber of commerce",
    ],
    correctIndex: 0,
    explanation:
      "Passing the exam is necessary but not always sufficient — application, prints, and appointments complete the path to legal sales authority.",
  },
];
