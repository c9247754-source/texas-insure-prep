import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
      "https://www.texasinsureprep.com",
  ),
  title: {
    default: "Texas Insure Prep — Free TX Life & Health Practice Tests",
    template: "%s · Texas Insure Prep",
  },
  description:
    "Free Texas Life, Accident & Health insurance license practice tests with 400+ original questions, Texas law drills, timed mocks, and study guides before Pearson VUE.",
  openGraph: {
    title: "Texas Insure Prep — Free TX Life & Health Practice Tests",
    description:
      "400+ original practice questions for Texas insurance licensing. Drill Texas law, ethics, and timed mocks.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <SiteHeader />
        <main className="flex-1 px-4 py-10 md:px-6 md:py-14">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
