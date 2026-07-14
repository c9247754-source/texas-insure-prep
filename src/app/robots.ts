import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
  "https://www.texasinsureprep.com";

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
