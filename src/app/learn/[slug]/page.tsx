import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CourseBanner } from "@/components/QuizEngine";
import { LEARN_ARTICLES, getLearnArticle } from "@/data/seo/learn-articles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return LEARN_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getLearnArticle(slug);
  if (!article) return { title: "Learn" };
  return {
    title: article.title,
    description: article.description,
  };
}

export default async function LearnArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getLearnArticle(slug);
  if (!article) notFound();

  return (
    <article className="mx-auto max-w-3xl">
      <p className="eyebrow">{article.eyebrow}</p>
      <h1 className="mt-2 font-display text-4xl leading-tight text-[var(--navy)] md:text-5xl">
        {article.title}
      </h1>
      <p className="mt-4 text-lg text-[var(--ink-muted)]">{article.description}</p>

      <div className="mt-10 grid gap-5 text-[17px] leading-relaxed text-[var(--ink)]">
        {article.body.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href={article.ctaHref} className="btn-primary">
          {article.ctaLabel}
        </Link>
        <Link href="/learn" className="btn-secondary">
          All guides
        </Link>
        <Link href="/pricing" className="btn-ghost">
          Pricing
        </Link>
      </div>

      <CourseBanner />
    </article>
  );
}
