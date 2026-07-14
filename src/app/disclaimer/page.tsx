import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
};

export default function DisclaimerPage() {
  return (
    <article className="mx-auto max-w-2xl leading-relaxed text-[var(--ink-muted)]">
      <h1 className="font-display text-4xl text-[var(--navy)]">Disclaimer</h1>
      <div className="mt-6 space-y-4 text-[15px]">
        <p>
          Texas Insure Prep provides original educational practice questions for
          people studying toward Texas insurance licensing exams. We are not
          affiliated with, endorsed by, or sponsored by the Texas Department of
          Insurance (TDI), Pearson VUE, Aceable, Kaplan, ExamFX, or any insurer.
        </p>
        <p>
          Questions are study aids only. They are not live exam items and may not
          match current scored forms. Always verify requirements, fees, outlines,
          and licensing steps on official TDI / Pearson VUE pages before you
          register or sell insurance.
        </p>
        <p>
          Course and affiliate links may earn a commission. Recommendations are
          for convenience and do not guarantee a passing score.
        </p>
      </div>
    </article>
  );
}
