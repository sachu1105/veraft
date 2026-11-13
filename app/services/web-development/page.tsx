import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/service-detail";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Custom software & web application development",
  description:
    "Purpose-built SaaS applications, business systems, dashboards, internal tools and customer portals — engineered around your requirements with AI-accelerated workflows and specialised engineers.",
  path: "/services/web-development",
});

export default function Page() {
  return <ServiceDetail slug="web-development" />;
}
