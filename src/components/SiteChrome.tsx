import Link from "next/link";

const links = [
  { href: "/practice/tx-life-health", label: "Practice" },
  { href: "/mock/tx-life-health", label: "Mock exam" },
  { href: "/pricing", label: "Pricing" },
  { href: "/guide/texas-law", label: "TX Law PDF" },
  { href: "/topics/tx-life-health", label: "Topics" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--line)] bg-[var(--paper)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link href="/" className="group">
          <span className="font-display text-xl tracking-tight text-[var(--navy)] md:text-2xl">
            Texas Insure Prep
          </span>
          <span className="mt-0.5 block text-[11px] uppercase tracking-[0.18em] text-[var(--ink-muted)]">
            Free TX license drills
          </span>
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm text-[var(--ink-muted)]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-[var(--navy)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-[var(--paper-deep)]">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 text-sm text-[var(--ink-muted)] md:px-6">
        <p>
          Educational practice only. Not affiliated with the Texas Department of
          Insurance, Pearson VUE, or any insurer.
        </p>
        <p>
          <Link href="/disclaimer" className="underline underline-offset-2">
            Full disclaimer
          </Link>
          {" · "}
          <Link href="/pricing" className="underline underline-offset-2">
            Pricing
          </Link>
          {" · "}
          Affiliate links may earn a commission.
        </p>
      </div>
    </footer>
  );
}
