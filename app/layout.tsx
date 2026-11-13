import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontSans, fontMono } from "@/lib/fonts";
import { cn } from "@/lib/cn";
import { pillars, site, social } from "@/lib/site";
import { MotionProvider } from "@/components/motion/motion-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { THEME_COLORS, themeInitScript } from "@/lib/theme";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "AI-native product engineering",
    "AI software development company",
    "MVP development",
    "startup product development",
    "custom software development",
    "SaaS development",
    "AI-powered product development",
    "UI/UX design",
    "application security and performance",
    "cloud deployment and maintenance",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  formatDetection: { email: false, telephone: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: THEME_COLORS.light,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  description: site.description,
  email: site.email,
  areaServed: "Worldwide",
  knowsAbout: [
    "Product engineering",
    "Software development",
    "AI model orchestration",
    "AI-powered products",
    "MVP development",
    "UI/UX design",
    "Application security",
    "Cloud deployment",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: site.email,
    availableLanguage: ["English"],
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: pillars.map((p) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: p.title, url: `${site.url}${p.href}` },
    })),
  },
  ...(social.length ? { sameAs: social.map((s) => s.href) } : {}),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  publisher: { "@id": `${site.url}/#organization` },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="light"
      // The init script may switch data-theme to "dark" before hydration.
      suppressHydrationWarning
      className={cn(fontSans.variable, fontMono.variable, "h-full antialiased")}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-paper text-ink">
        {/* No-JS safety net: reveal anything Motion left hidden for its entrance. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <a
          href="#main"
          className="sr-only rounded-md bg-ink px-4 py-2 text-paper focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Header />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
