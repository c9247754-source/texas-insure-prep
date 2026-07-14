import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
  "https://texas-insure-prep.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/unlock/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
