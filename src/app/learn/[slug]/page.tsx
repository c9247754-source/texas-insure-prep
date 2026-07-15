import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CourseBanner } from "@/components/QuizEngine";
import { SITE_URL } from "@/data/site";
import {
  LEARN_ARTICLES,
  getLearnArticle,
  getLearnArticleBody,
  getLearnArticleFaqs,
  getLearnRelatedArticles,
} from "@/data/seo/learn-articles";

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

  const body = getLearnArticleBody(article);
  const faqs = getLearnArticleFaqs(article.slug);
  const related = getLearnRelatedArticles(article.slug);

  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    author: { "@type": "Organization", name: "Texas Insure Prep" },
    publisher: { "@type": "Organization", name: "Texas Insure Prep" },
    mainEntityOfPage: `${SITE_URL}/learn/${article.slug}`,
  };

  return (
    <article className="mx-auto max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <p className="eyebrow">{article.eyebrow}</p>
      <h1 className="mt-2 font-display text-4xl leading-tight text-[var(--navy)] md:text-5xl">
        {article.title}
      </h1>
      <p className="mt-4 text-lg text-[var(--ink-muted)]">{article.description}</p>

      <div className="mt-10 grid gap-5 text-[17px] leading-relaxed text-[var(--ink)]">
        {body.map((paragraph) => (
          <p key={paragraph.slice(0, 64)}>{paragraph}</p>
        ))}
      </div>

      {faqs.length > 0 && (
        <section className="mt-12 border border-[var(--line)] bg-white/80 p-6">
          <h2 className="font-display text-2xl text-[var(--navy)]">
            Frequently asked questions
          </h2>
          <dl className="mt-6 grid gap-5">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="font-medium text-[var(--ink)]">{faq.question}</dt>
                <dd className="mt-2 text-[var(--ink-muted)]">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-xl text-[var(--navy)]">Related guides</h2>
          <ul className="mt-4 grid gap-2">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={
                    item.slug === "pricing"
                      ? "/pricing"
                      : `/learn/${item.slug}`
                  }
                  className="text-[var(--navy)] underline underline-offset-2"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

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
