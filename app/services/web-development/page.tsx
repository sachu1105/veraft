import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/service-detail";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Web app & SaaS development with AI agents",
  description:
    "Production-grade web apps, SaaS products, MVPs, dashboards and internal tools — built fast by AI agents, reviewed by engineers, deployed to your own cloud.",
  path: "/services/web-development",
});

export default function Page() {
  return <ServiceDetail slug="web-development" />;
}
