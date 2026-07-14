import type { MetadataRoute } from "next";
import { EXAMS } from "@/data/catalog";
import { LEARN_ARTICLES } from "@/data/seo/learn-articles";
import { DOMAIN_LABELS, type QuestionDomain } from "@/data/types";

const base = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
  "https://texas-insure-prep.vercel.app";

const domains = Object.keys(DOMAIN_LABELS) as QuestionDomain[];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/pricing",
    "/learn",
    "/guide/texas-law",
    "/disclaimer",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const learn = LEARN_ARTICLES.map((a) => ({
    url: `${base}/learn/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const exams = EXAMS.flatMap((exam) => {
    const roots = [
      `/practice/${exam.slug}`,
      `/mock/${exam.slug}`,
      `/topics/${exam.slug}`,
    ].map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }));

    const byDomain = domains.map((domain) => ({
      url: `${base}/practice/${exam.slug}/${domain}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    }));

    return [...roots, ...byDomain];
  });

  return [...staticRoutes, ...learn, ...exams];
}
